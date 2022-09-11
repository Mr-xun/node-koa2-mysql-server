/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-10 16:31:26
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-11 17:56:46
 * @Description: UserController
 */
const verify = require("../utils/verifyToken");
const config = require("../config");
const AdminService = require("../service/AdminService");
const UserService = require("../service/UserService");
const utils = require("../utils");
const response = require("../utils/response");
const paginate = require("../utils/paginate");

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
module.exports = {
    userLogin,
    userVerify,
    userList,
};
