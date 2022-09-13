/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 17:03:16
 * @Description: AccessLogMiddleware
 */
import { accessLogger } from "../logger";
const AccessLogMiddleware = (ctx, next) => {
    let logStr = `path:${ctx.url} | method:${ctx.method} | ua:${ctx.header["user-agent"]}`;
    accessLogger.info(logStr);
    return next();
};
export default AccessLogMiddleware;
