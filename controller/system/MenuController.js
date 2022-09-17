/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:44:55
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-17 17:57:07
 * @Description: System_MenuModel
 */
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import SystemMenuService from "../../service/system/MenuService";
//菜单创建
const menuCreate = async (ctx) => {
    const rules = {
        menu_name: [{ type: "string", required: true, message: "菜单名称不能为空" }],
    };
    const formData = ctx.request.body;
    const { data, error } = await validate(formData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const row = await SystemMenuService.menuCreate(data);
        if (row.id) {
            return response.success(ctx, null, "创建成功");
        }
        return response.fail(ctx, "创建失败");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常", JSON.stringify(error));
    }
};
export default {
    menuCreate,
};
