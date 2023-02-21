/*
 * @Author: xunxiao
 * @Date: 2023-02-17 14:36:21
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-17 15:25:36
 * @Description: Log_LoginModel
 */
import Sequelize from 'sequelize';
import DB from '@root/db';
const LogLogin = DB.sequelize.define("log_login",{
    logId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "日志Id",
        field: "id",
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "用户Id",
        field: "user_id",
    },
    userName: {
        type: Sequelize.STRING,
        comment: "用户名",
        field: "user_name",
    },
    realName: {
        type: Sequelize.STRING,
        comment: "姓名",
        field: "real_name",
    },
    ip: {
        type: Sequelize.STRING,
        comment: "IP",
    },
    location: {
        type: Sequelize.STRING,
        comment: "登录地点",
    },
    ua: {
        type: Sequelize.STRING,
        comment: "ua", 
    },
    browser: {
        type: Sequelize.STRING,
        comment: "浏览器版本",
    },
    os: {
        type: Sequelize.STRING,
        comment: "系统版本",
    },
    msg:{
        type: Sequelize.STRING,
        comment: "描述", 
    },
    status: {
        //状态 1成功 2失败
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: "登录状态",
    },
    lastLoginTime: {
        type: Sequelize.DATE,
        comment: "上次登录时间",
        field: "last_login_time",
    },
    loginTime: {
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
LogLogin.sync();
export default LogLogin;
