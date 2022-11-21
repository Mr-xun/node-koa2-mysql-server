/*
 * @Author: xunxiao
 * @Date: 2022-11-21 17:03:55
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-21 17:48:50
 * @Description: 接口级权限校验
 */
import verify from "@root/utils/verifyToken";
import config from "@root/config";
import response from "@root/utils/response";
import SystemUserService from "@root/service/system/UserService";
const ApiAuthMiddleware = (authCode) => {
    return async (ctx, next) => {
        const token = ctx.header[config.jwt.header].replace("Bearer ", "");
        const tokenInfo = await verify.getToken(token);
        let { dataValues } = await SystemUserService.GetUserById(tokenInfo.userId);
        let permissions = []; //权限码
        dataValues.system_roles.forEach((item) => {
            permissions = permissions.concat(item.dataValues.system_menus.filter((m) => !!m.dataValues.perms).map((m) => m.dataValues.perms));
        });
        //角色权限码去重
        permissions = [...new Set(permissions)];
        if (permissions.indexOf(authCode) > -1) {
            return next();
        }
        return response.fail(ctx, `用户无操作权限，请联系管理员`);
    };
};
export default ApiAuthMiddleware;
