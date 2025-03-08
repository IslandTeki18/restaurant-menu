const axios = require("axios");
require("dotenv").config();

const translateText = async (text, targetLang) => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`;
  const response = await axios.post(url, {
    q: text,
    target: targetLang,
  });
  return response.data.data.translations[0].translatedText;
};

const translateMenuItem = async (menuItem) => {
  const translatedName = await translateText(menuItem.name_en, "es");
  menuItem.name_es = translatedName;
  return menuItem;
};

module.exports = {
  translateText,
  translateMenuItem,
};
