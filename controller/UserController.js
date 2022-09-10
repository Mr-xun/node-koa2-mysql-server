const verify = require("../utils/verifyToken");
const config = require("../config");
const AdminService = require("../service/AdminService");
const response = require("../utils/response");
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
    console.log(token, tokenInfo);
    response.success(ctx, {
        token,
        tokenInfo,
    });
};
module.exports = {
    userLogin,
    userVerify,
};
