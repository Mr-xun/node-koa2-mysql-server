/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:14:39
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-11 17:38:36
 * @Description: UserModel
 */
const Sequelize = require("sequelize");
const db = require("../db");
const User = db.sequelize.define("User", {
    username: {
        //用户名
        type: Sequelize.STRING,
        comment:'用户名'
    },
    avatar: {
        //头像
        type: Sequelize.STRING,
        comment:'用户头像'
    },
    mobile: {
        //联系电话
        type: Sequelize.STRING,
        comment:'联系电话'
    },
    role: {
        //角色 1 管理员 2普通用户
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment:'用户角色'

    },
    is_delete: {
        //是否删除 1是 0 否
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment:'是否删除'
    },
});

User.sync();
module.exports = User;
