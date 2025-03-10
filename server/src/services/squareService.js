const { SquareClient } = require("square");
const MenuItem = require("../models/MenuItem");
const { translateMenuItem } = require("./translationService");
require("dotenv").config();

const client = new SquareClient({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const fetchSquareMenu = async () => {
  try {
    const { result } = await client.catalogApi.listCatalog({
      types: "ITEM",
    });
    return result.objects;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch menu from Square");
  }
};

const upsertMenuItem = async (item) => {
  const { id, updated_at, item_data } = item;
  const { name, description, price_money, available } = item_data;

  const existingItem = await MenuItem.findOne({ squareId: id });

  if (
    !existingItem ||
    new Date(updated_at) > new Date(existingItem.updatedAt)
  ) {
    let menuItem = {
      squareId: id,
      name_en: name,
      description,
      price: price_money.amount / 100,
      availability: available,
      updatedAt: updated_at,
    };

    menuItem = await translateMenuItem(menuItem);

    await MenuItem.findOneAndUpdate({ squareId: id }, menuItem, {
      upsert: true,
    });
  }
};

const handleSquareWebhook = async (event) => {
  const { type, data } = event;

  if (type === "catalog.item.updated" || type === "catalog.item.created") {
    await upsertMenuItem(data.object);
  }
};

module.exports = {
  fetchSquareMenu,
  handleSquareWebhook,
};
