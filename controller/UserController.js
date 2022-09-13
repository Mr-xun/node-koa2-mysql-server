/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-10 16:31:26
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 17:01:57
 * @Description: UserController
 */
import verify from "../utils/verifyToken";
import config from "../config";
import utils from "../utils";
import response from "../utils/response";
import paginate from "../utils/paginate";
import AdminService from "../service/AdminService";
import UserService from "../service/UserService";

const userLogin = async (ctx) => {
    const admin = await AdminService.getAdminUser();
    const token = await verify.setToken({ firstName: admin.firstName, userId: admin.id });
    response.success(ctx, {
        admin,
        token,
    });
};
const userVerify = async (ctx) => {
    const token = ctx.header[config.jwt.header].replace("Bearer ", "");
    const tokenInfo = await verify.getToken(token);
    response.success(ctx, {
        token,
        tokenInfo,
    });
};
const userList = async (ctx) => {
    let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
    let where = {
        limit,
        offset,
    };
    const { rows, count } = await UserService.getUserListByPage(where);
    response.success(ctx, paginate(rows, count, limit));
};
export default {
    userLogin,
    userVerify,
    userList,
};
