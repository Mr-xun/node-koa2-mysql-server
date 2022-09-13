/*
 * @Author: xunxiao
 * @Date: 2022-09-13 08:33:50
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 16:57:35
 * @Description:
 */
import Sequelize from "sequelize";
import DB from "../db";
const Admin = DB.sequelize.define("Admin", {
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
export default Admin;
