/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:44:55
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-27 21:24:10
 * @Description: SystemMenuController
 */
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import SystemMenuService from "../../service/system/MenuService";
//菜单创建
const menuCreate = async (ctx) => {
    const rules = {
        menuName: [{ type: "string", required: true, message: "菜单名称不能为空" }],
    };
    const formData = ctx.request.body;
    const { data, error } = await validate(formData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const row = await SystemMenuService.menuCreate(data);
        if (row.menuId) {
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
    if (!fromData.menuId) {
        return response.fail(ctx, "缺失menuId");
    }
    const isExist = !!(await SystemMenuService.getMenuOne({ menuId: fromData.menuId }));
    if (!isExist) {
        return response.fail(ctx, "该菜单不存在");
    }
    const rules = {
        menuName: [{ type: "string", required: true, message: "菜单名称不能为空" }],
    };
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        if(!data.parentId){
            data.parentId = 0;
        }
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
        function arrayToTree(array, parentId) {
            let result = [];
            array.forEach((item) => {
                if (item.parentId == parentId) {
                    item.children = arrayToTree(array, item.menuId);
                    //orderNum 排序
                    item.children.sort((a, b) => {
                        return a.orderNum - b.orderNum;
                    });
                    result.push(item);
                }
            });
            result.sort((a, b) => {
                return a.orderNum - b.orderNum;
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
        const delCount = await SystemMenuService.menuDelete(deleteIds);
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
