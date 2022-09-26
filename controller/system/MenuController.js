/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:44:55
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-26 17:05:16
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
//菜单修改
const menuUpdate = async (ctx) => {
    const fromData = ctx.request.body;
    if(!fromData.id){
        return response.fail(ctx, "缺失id");
    }
    const isExist = !!(await SystemMenuService.getMenuOne({ id: fromData.id }));
    if (!isExist) {
        return response.fail(ctx, "该菜单不存在");
    }
    const rules = {
        menu_name: [{ type: "string", required: true, message: "菜单名称不能为空" }],
    };
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const [upCount] = await SystemMenuService.menuUpdate(data);
        if (upCount) {
            return response.success(ctx);
        } else {
            return response.fail(ctx, "更新失败");
        }
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
//菜单列表tree结构
const menuGetTree = async (ctx) => {
    try {
        const rows = await SystemMenuService.getMenuAll();
        function arrayToTree(array, parent_id) {
            let result = [];
            array.forEach((item) => {
                if (item.parent_id == parent_id) {
                    item.children = arrayToTree(array, item.id);
                    result.push(item);
                }
            });
            return result;
        }
        return response.success(ctx, {
            rows: arrayToTree(rows, 0),
        });
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常", JSON.stringify(error));
    }
};
//菜单批量删除
const menuBatchDel = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const [delCount] = await SystemMenuService.menuDelete(deleteIds);
        if (delCount) {
            return response.success(ctx);
        } else {
            return response.fail(ctx, "删除失败");
        }
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
export default {
    menuCreate,
    menuUpdate,
    menuGetTree,
    menuBatchDel,
};
