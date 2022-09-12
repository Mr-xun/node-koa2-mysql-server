/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-12 17:55:00
 * @Description: AccessLogMiddleware
 */
const Logger = require("../logger");
module.exports = function AccessLogMiddleware(ctx, next) {
    let logStr = `path:${ctx.url} | method:${ctx.method} | ua:${ctx.header["user-agent"]}`;
    Logger("access").info(logStr);
    return next();
};
