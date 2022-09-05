const Admin = require("../model/Admin");
const getAdminUser = async () => {
    return Admin.findOne();
};
module.exports = {
    getAdminUser,
};
