/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:14:39
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-15 11:20:08
 * @Description: System_UserModel
 */
import Sequelize from "sequelize";
import DB from "../db";
const User = DB.sequelize.define("system_user", {
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名",
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "用户密码",
    },
    avatar: {
        type: Sequelize.STRING,
        comment: "用户头像",
    },
    mobile: {
        type: Sequelize.STRING,
        comment: "联系电话",
    },
    role: {
        //角色 1 管理员 2普通用户
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: "用户角色",
    },
    is_delete: {
        //是否删除 1是 0 否
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "是否删除",
    },
});

User.sync();
export default User;
