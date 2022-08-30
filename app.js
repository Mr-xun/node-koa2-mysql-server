const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("koa2-cors");
const koajwt = require("koa-jwt");
const config = require("./config");
const AccessLogMiddleware = require("./middlewares/AccessLogMiddleware");
const resReturn = require("./utils/resReturn");
const index = require("./routes/index");
const user = require("./routes/user");
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
            ctx.body = resReturn.error(err.name + ":" + err.message, "The token is invalid", resReturn.CODE.AUTH_ERROR);
        } else {
            throw err;
        }
    });
});

//jwt认证
app.use(
    koajwt({
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

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
