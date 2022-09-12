/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-12 17:54:36
 * @Description:
 */
import Koa from "koa";
const app = new Koa();
import views from "koa-views";
import json from "koa-json";
import onerror from "koa-onerror";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";
import dotenv from "dotenv";
dotenv.config();
import cors from "koa2-cors";
import koaJwt from "koa-jwt";
const DB = require("./db");
//连接数据库
DB.connect();
const config = require("./config");
const AccessLogMiddleware = require("./middlewares/AccessLogMiddleware");
console.log(AccessLogMiddleware, 2222);

import response from "./utils/response";
const index = require("./routes/index");
const user = require("./routes/user");
const admin = require("./routes/admin");

app.use(
    cors({
        origin: (ctx) => {
            //设置允许来自指定域名请求
            if (ctx.url === "/test") {
                return "*"; // 允许来自所有域名请求
            }
            return "http://localhost:8087"; //只允许http://localhost:8087这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
        allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
        exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
    })
);

// error handler
onerror(app);

// middlewares
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"],
    })
);
app.use(json());
app.use(AccessLogMiddleware);
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
    views(__dirname + "/views", {
        extension: "pug",
    })
);

app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            // 自定义返回结果
            ctx.status = 401;
            response.error(ctx, `The token is invalid`, `${err.name}:${err.message}`, response.CODE.AUTH_ERROR);
        } else {
            throw err;
        }
    });
});

//jwt认证
app.use(
    koaJwt({
        secret: config.jwt.signKey,
    }).unless({
        path: config.jwt.unRoute,
    })
);
// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(admin.routes(), admin.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
