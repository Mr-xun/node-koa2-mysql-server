const Logger = require("../logger");
module.exports = function AccessLogMiddleware(ctx, next) {
    let logStr = `path:${ctx.path} | method:${ctx.method} | ua:${ctx.header["user-agent"]}`;
    Logger("access").info(logStr);
    return next();
};
