const AdminService = require("../service/AdminService");
const findOne = async (ctx) => {
    const admin = await AdminService.getAdminUser();
    console.log(admin, "222");
    ctx.body = admin || {a:888};
};
module.exports = {
    findOne,
};
