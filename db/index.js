/*
 * @Author: xunxiao
 * @Date: 2022-09-13 11:14:23
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-15 11:30:34
 * @Description: 数据库设置
 */
import path from "path";
import Sequelize from "sequelize";
import config from "../config";
import { dbLogger } from "../logger";
const dbConfig = {
    database: config.db.db_name, // 使用哪个数据库
    username: config.db.db_user, // 用户名
    password: config.db.db_password, // 口令
    host: config.db.db_host, // 主机名
    port: config.db.db_port, // 端口号，MySQL默认3306
};
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: "mysql",
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 30000,
    },
    logging: (...msg) => dbLogger.info(msg),
    //解决中文输入问题
    define: {
        charset: "utf8",
        dialectOptions: {
            collate: "utf8_general_ci",
        },
    },
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
    },
    models: [path.join(__dirname, "..", ",model/**/*.js")],
});
export default {
    sequelize,
    connect: () => {
        // 测试连接是否成功
        sequelize
            .authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch((err) => {
                console.log("Unable to connect to the database", err);
            });
    },
};
