/*
 * @Author: xunxiao
 * @Date: 2022-09-13 11:14:22
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-27 18:26:27
 * @Description: entry
 */
import Koa from "koa";
import views from "koa-views";
import json from "koa-json";
import onerror from "koa-onerror";
import bodyparser from "koa-bodyparser";
import koaBody from "koa-body";
import logger from "koa-logger";
import "module-alias/register";
import "dotenv/config";
import cors from "koa2-cors";
import koaJwt from "koa-jwt";
import db from "./db";
import response from "./utils/response";
import config from "./config";
import AccessLogMiddleware from "./middlewares/AccessLogMiddleware";
import OperationLogMiddleware from "./middlewares/OperationLogMiddleware";
import router from "./routes";
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
    koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024, //设置上传文件大小最大限制，默认 2M
            // uploadDir: path.join(__dirname, '..', 'static/upload'), // 上传目录
            keepExtensions: true,// 保留文件扩展名
        },
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

// 操作日志中间件
app.use(OperationLogMiddleware());
// routes
app.use(router.routes(), router.allowedMethods());
// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
