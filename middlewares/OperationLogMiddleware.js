/*
 * @Author: xunxiao
 * @Date: 2023-02-20 15:11:05
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-21 10:38:25
 * @Description: 记录操作日志中间件
 */
import UAParser from "ua-parser-js";
import config from "@root/config";
import verify from "@root/utils/verifyToken";
import LogOperationService from "@root/service/log/OperationService";
const OperationLogMiddleware = () => {
    return async (ctx, next) => {
        ctx.state.operationLog = {};
        if (ctx.method === "GET") {
            // 不记录get请求
            await next();
        } else {
            const start = new Date();
            await next();
            const filterUrls = ["/api/system/user/login"]; //含该路由不记录操作日志
            const token = ctx.header[config.jwt.header].replace("Bearer ", "");
            if (token && filterUrls.indexOf(ctx.url) === -1) {
                const userInfo = await verify.getToken(token);
                const ua = ctx.request.header["user-agent"];
                const uaParser = new UAParser(ua).getResult();
                let operationLogParams = {
                    userId: userInfo.userId,
                    userName: userInfo.userName,
                    realName: userInfo.realName,
                    ua: uaParser.ua || "",
                    browser: (uaParser.browser.name || "") + (uaParser.browser.version || ""),
                    os: (uaParser.os.name || "") + (uaParser.os.version || ""),
                    method: ctx.method,
                    url: ctx.url,
                    params: JSON.stringify(ctx.request.body),
                    duration: new Date() - start,
                    describe: ctx.state.operationLog.describe,
                };
                if (ctx.method === "DELETE") {
                    operationLogParams.params = JSON.stringify(ctx.params);
                }
                await LogOperationService.Create(operationLogParams);
            }
        }
    };
};
export default OperationLogMiddleware;
