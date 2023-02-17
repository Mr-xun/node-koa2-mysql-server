/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:44:55
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-18 11:21:40
 * @Description: SystemMenuController
 */
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import SystemMenuService from "@root/service/system/MenuService";
//菜单创建
const Create = async (ctx) => {
    const rules = {
        menuName: [{ type: "string", required: true, message: "菜单名称不能为空" }],
    };
    const formData = ctx.request.body;
    const { data, error } = await validate(formData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        if (!data.parentId) {
            data.parentId = 0;
        }
        const row = await SystemMenuService.Create(data);
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
const Update = async (ctx) => {
    const fromData = ctx.request.body;
    const rules = {
        menuId: [{ type: "number", required: true, message: "菜单id不能为空" }],
        menuName: [{ type: "string", required: true, message: "菜单名称不能为空" }],
    };
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const isExist = !!(await SystemMenuService.GetOne({ menuId: data.menuId }));
        if (!isExist) {
            return response.fail(ctx, "该菜单不存在");
        }
        if (!data.parentId) {
            data.parentId = 0;
        }
        const [upCount] = await SystemMenuService.Update(data);
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
const GetTree = async (ctx) => {
    try {
        const rows = await SystemMenuService.GetAll({ raw: true });
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
        return response.success(ctx, arrayToTree(rows, 0));
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常", JSON.stringify(error));
    }
};
//菜单批量删除
const BatchDel = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const { error } = await SystemMenuService.BatchDel(deleteIds);
        if (error) {
            return response.fail(ctx, error);
        }
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};


export default {
    Create,
    Update,
    GetTree,
    BatchDel,
};
