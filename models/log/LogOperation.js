import Sequelize from "sequelize";
import DB from "@root/db";
const LogOperation = DB.sequelize.define("log_operation", {
    logId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "日志Id",
        field: "id",
    },
    userId: {
        type: Sequelize.STRING,
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
    method: {
        type: Sequelize.STRING,
        comment: "请求类型",
    },
    params: {
        type: Sequelize.STRING,
        comment: "请求参数",
    },
    url: {
        type: Sequelize.STRING,
        comment: "请求地址",
    },
    describe: {
        type: Sequelize.STRING,
        comment: "操作描述",
    },
    duration: {
        type: Sequelize.INTEGER,
        comment: "耗时",
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
LogOperation.sync();
export default LogOperation;
