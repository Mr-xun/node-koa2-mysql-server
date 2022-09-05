//db.js
const path  = require('path')
const Sequelize = require("sequelize");
const config = require("../config");
const Logger = require("../logger");
const db = {
    database: config.db.db_name, // 使用哪个数据库
    username: config.db.db_user, // 用户名
    password: config.db.db_password, // 口令
    host: config.db.db_host, // 主机名
    port: config.db.db_port, // 端口号，MySQL默认3306
};
const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: "mysql",
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 30000,
    },
    logging: (...msg) => Logger("db").info(msg),
    //解决中文输入问题
    define: {
        charset: "utf8",
        dialectOptions: {
            collate: "utf8_general_ci",
        },
    },
    models:[path.join(__dirname,'..',',model/**/*.js')]
});

module.exports = {
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
