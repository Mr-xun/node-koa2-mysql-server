/*
 * @Author: xunxiao
 * @Date: 2022-09-13 08:33:50
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-15 08:55:40
 * @Description: AdminController
 */
import validate from "../utils/validate";
import response from "../utils/response";
import AdminService from "../service/AdminService";
const findOne = async (ctx) => {
    const rules = {
        name: [{ type: "string", required: true, message: "用户姓名不能为空" }],
        age: [{ type: "string", required: true, message: "用户年龄不能为空" }],
    };
    const queryData = {
        name: ctx.query.name,
        age: ctx.query.age,
    };
    const { data, error } = await validate(queryData, rules);
    if (error !== null) {
        return response.fail(ctx, error);
    }
    const admin = await AdminService.getAdminUser();
    ctx.body = admin || { a: 888 };
};
export default {
    findOne,
};
