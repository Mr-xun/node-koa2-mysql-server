const Sequelize = require("sequelize");
const db = require("../db");
const Admin = db.sequelize.define("Admin", {
    // 在这里定义模型属性
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
    },
});
Admin.sync();
module.exports = Admin;
