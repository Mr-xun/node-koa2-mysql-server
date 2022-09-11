/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-11 18:02:28
 * @Description: common config 
 */
module.exports = {
    server: {
        port: process.env.SERVER_PORT,
    },
    db: {
        db_host: process.env.DB_HOST,
        db_name: process.env.DB_NAME,
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD,
        db_port: process.env.DB_PORT,
    },
    jwt: {
        header: "authorization", //请求头
        signKey: "mrxun-server-jwt", // token密钥
        signTime: 3600 * 24 * 7, //过期时间  七天
        //不需要验证的路由 用户登录、用户注册
        unRoute: [/^\/user\/login/, /^\/user\/register/, /^\/admin\/findOne/],
    },
    //日志
    logger: {
        appenders: {
            cheese: { type: "dateFile", filename: `logs/cheese/cheese`, pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true },
            access: { type: "dateFile", filename: `logs/access/access`, pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true },
            db: { type: "dateFile", filename: `logs/db/db`, pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true },
        },
        categories: {
            default: { appenders: ["cheese"], level: "info" },
            access: { appenders: ["access"], level: "info" },
            db: { appenders: ["db"], level: "info" },
        },
    },
};
