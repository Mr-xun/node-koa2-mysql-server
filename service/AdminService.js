/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 17:03:17
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-11 17:20:27
 * @Description: AdminService
 */
const Admin = require("../models/Admin");
const getAdminUser = async () => {
    return Admin.findOne();
};
module.exports = {
    getAdminUser,
};
