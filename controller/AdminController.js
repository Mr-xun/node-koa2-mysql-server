/*
 * @Author: xunxiao
 * @Date: 2022-09-13 08:33:50
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 16:58:50
 * @Description: AdminController
 */
import AdminService from "../service/AdminService";
const findOne = async (ctx) => {
    const admin = await AdminService.getAdminUser();
    ctx.body = admin || { a: 888 };
};
export default {
    findOne,
};
