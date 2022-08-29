module.exports = {
    server: {
        port: process.env.SERVER_PORT,
    },
    db: {
        db_host: process.env.DB_HOST,
        db_name: process.env.DB_NAME,
        db_user: process.env.DB_USER,
        db_port: process.env.DB_PORT,
    },
    jwt: {
        //请求头
        header: "authorization",
        // token密钥
        signKey: "mrxun-server-jwt",
        //过期时间  七天
        signTime: 3600 * 24 * 7,
        //不需要验证的路由 用户登录、用户注册
        unRoute: [/^\/user\/login/, /^\/user\/register/],
    },
};
