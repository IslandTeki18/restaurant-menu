const User = require("../models/User.js");
const connectDB = require("../../db.js");
const bcrypt = require("bcryptjs");

const admin = {
  name: "Landon McKell",
  email: "landon.test@test.com",
  password: bcrypt.hashSync("Password123!", 10),
  role: "admin",
};

const importUser = async () => {
    try {
        await connectDB();
        await User.deleteMany({});
        const user = new User(admin);
        await user.save();
        console.log("Admin user created successfully");

        process.exit();
    } catch (error) {
        console.error("Error creating admin user:", error);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await connectDB();
        await User.deleteMany({});
        console.log("Data destroyed successfully");

        process.exit();
    } catch (error) {
        console.error("Error destroying data:", error);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importUser();
}