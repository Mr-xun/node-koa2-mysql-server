/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:13:33
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-11 17:57:21
 * @Description: UserService
 */
const User = require("../models/User");
const getUserListByPage = ({ limit, offset }) => {
    return User.findAndCountAll({
        limit,
        offset,
    });
};
module.exports = {
    getUserListByPage,
};
