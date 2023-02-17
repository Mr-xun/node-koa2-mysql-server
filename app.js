/*
 * @Author: xunxiao
 * @Date: 2022-09-13 11:14:22
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-17 09:52:55
 * @Description: entry
 */
import Koa from "koa";
import views from "koa-views";
import json from "koa-json";
import onerror from "koa-onerror";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";
import "module-alias/register";
import "dotenv/config";
import cors from "koa2-cors";
import koaJwt from "koa-jwt";
import db from "./db";
import response from "./utils/response";
import config from "./config";
import AccessLogMiddleware from "./middlewares/AccessLogMiddleware";

import indexRoute from "./routes/index";
import systemUserRoute from "./routes/system/user";
import systemMenuRoute from "./routes/system/menu";
import systemRoleRoute from "./routes/system/role";
import systemDeptRoute from "./routes/system/dept";
import logLoginRoute from './routes/log/login';
import testApiRoute from "./routes/testapi/post";

const app = new Koa();
//连接数据库
db.connect();

app.use(
    cors({
        origin: (ctx) => {
            //设置允许来自指定域名请求
            // if (ctx.url.indexOf("/api") != -1) {
            //     return "*"; // 允许来自所有域名请求
            // }
            return ctx.header.origin; //允许ctx.header.origin这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
        allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
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
app.use(indexRoute.routes(), indexRoute.allowedMethods());
app.use(systemUserRoute.routes(), systemUserRoute.allowedMethods());
app.use(systemMenuRoute.routes(), systemMenuRoute.allowedMethods());
app.use(systemRoleRoute.routes(), systemRoleRoute.allowedMethods());
app.use(systemDeptRoute.routes(), systemDeptRoute.allowedMethods());
app.use(logLoginRoute.routes(), logLoginRoute.allowedMethods());
app.use(testApiRoute.routes(), testApiRoute.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
