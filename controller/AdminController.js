const AdminService = require("../service/AdminService");
const findOne = async (ctx) => {
    const admin = await AdminService.getAdminUser();
    ctx.body = admin || { a: 888 };
};
module.exports = {
    findOne,
};
