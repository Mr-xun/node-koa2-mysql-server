/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:13:33
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 17:02:48
 * @Description: UserService
 */
import User from "../models/User";
const getUserListByPage = ({ limit, offset }) => {
    return User.findAndCountAll({
        limit,
        offset,
    });
};
export default {
    getUserListByPage,
};
