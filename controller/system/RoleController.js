/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:44:55
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-28 17:03:02
 * @Description: SystemRoleController
 */
import utils from "@root/utils";
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import paginate from "@root/utils/paginate";
import SystemRoleService from "../../service/system/RoleService";
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
        const isExistUser = !!(await SystemRoleService.GetOne({ roleName: data.roleName }));
        if (isExistUser) {
            return response.fail(ctx, "该角色已存在");
        }
        const row = await SystemRoleService.Create(data);
        if (row.roleId) {
            return response.success(ctx, null, "创建成功");
        }
        return response.fail(ctx, "创建失败");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常", JSON.stringify(error));
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
        const isExist = !!(await SystemRoleService.GetOne({ roleId: data.roleId }));
        if (!isExist) {
            return response.fail(ctx, "该角色不存在");
        }
        const [upCount] = await SystemRoleService.Update(data);
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
//角色列表
const GetList = async (ctx) => {
    try {
        let { roleName = "" } = ctx.query;
        let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
        let condition = {
            where: { roleName },
            limit,
            offset,
        };

        const { rows, count } = await SystemRoleService.GetListByPage(condition);
        response.success(ctx, paginate(rows, count, limit));
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
        const delCount = await SystemRoleService.BatchDel(deleteIds);
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
    Create,
    Update,
    GetList,
    BatchDel,
};
