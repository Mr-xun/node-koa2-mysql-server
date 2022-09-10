const verify = require("../utils/verifyToken");
const config = require("../config");
const AdminService = require("../service/AdminService");
const userLogin = async (ctx) => {
    const admin = await AdminService.getAdminUser();
    const token = await verify.setToken({ firstName: admin.firstName, userId: admin.id });
    ctx.body = {
        admin,
        token,
    };
};
const userVerify = async (ctx) => {
    const token = ctx.header[config.jwt.header].replace("Bearer ", "");
    const tokenInfo = await verify.getToken(token);
    console.log(token, tokenInfo);
    ctx.body = {
        token,
        tokenInfo,
    };
};
module.exports = {
    userLogin,
    userVerify,
};
