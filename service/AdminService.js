/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 17:03:17
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 16:57:57
 * @Description: AdminService
 */
import Admin from "../models/Admin";
const getAdminUser = async () => {
    return Admin.findOne();
};
export default {
    getAdminUser,
};
