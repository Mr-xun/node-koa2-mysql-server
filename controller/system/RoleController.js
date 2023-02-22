/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:44:55
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 13:12:07
 * @Description: SystemRoleController
 */
import utils from "@root/utils";
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import paginate from "@root/utils/paginate";
import SystemRoleService from "@root/service/system/RoleService";

//角色创建
const Create = async (ctx) => {
    const rules = {
        roleName: [{ type: "string", required: true, message: "角色名称不能为空" }],
    };
    const formData = ctx.request.body;
    const { data, error } = await validate(formData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const isExistRole = !!(await SystemRoleService.GetOne({ roleName: data.roleName }));
        if (isExistRole) {
            return response.fail(ctx, "该角色已存在");
        }
        const { error } = await SystemRoleService.Create(data);
        if (error) {
            return response.fail(ctx, "创建失败");
        }
        ctx.state.operationLog.describe = '角色创建'
        return response.success(ctx, null, "创建成功");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
//角色修改
const Update = async (ctx) => {
    const fromData = ctx.request.body;
    const rules = {
        roleId: [{ type: "number", required: true, message: "角色id不能为空" }],
        roleName: [{ type: "string", required: true, message: "角色名称不能为空" }],
    };
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const { error } = await SystemRoleService.Update(data);
        if (error) {
            return response.fail(ctx, error);
        }
        ctx.state.operationLog.describe = '角色修改'
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
//角色列表
const GetListByPage = async (ctx) => {
    try {
        let { roleName = "" } = ctx.query;
        let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
        let condition = {
            where: { roleName },
            limit,
            offset,
        };
        const { rows, count } = await SystemRoleService.GetListByPage(condition);
        let list = rows.map((row) => row.dataValues);
        list.forEach((item) => {
            item.menuIds = item.system_menus.map((m) => m.dataValues.id);
            delete item.system_menus;
        });
        response.success(ctx, paginate(list, count, limit));
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
const GetAll = async (ctx) => {
    try {
        const rows = await SystemRoleService.GetAll();
        response.success(ctx, rows);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
//角色批量删除
const BatchDel = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const { error } = await SystemRoleService.BatchDel(deleteIds);
        if (error) {
            return response.fail(ctx, error);
        }
        ctx.state.operationLog.describe = '角色删除'
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
export default {
    Create,
    Update,
    GetListByPage,
    GetAll,
    BatchDel,
};
