/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:14:39
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-27 20:19:43
 * @Description: System_UserModel
 */
import Sequelize from "sequelize";
import DB from "../db";
const User = DB.sequelize.define("system_user", {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "用户Id",
        field: "id",
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名",
        field: "user_name",
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
    createTime: {
        type: Sequelize.DATE,
        comment: "创建时间",
        field: "create_time",
    },
    updateTime: {
        type: Sequelize.DATE,
        comment: "更新时间",
        field: "update_time",
    },
});

User.sync();
export default User;
