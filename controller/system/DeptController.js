/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:44:55
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-28 17:04:06
 * @Description: SystemDeptController
 */
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import SystemDeptService from "../../service/system/DeptService";
//部门创建
const Create = async (ctx) => {
    const rules = {
        deptName: [{ type: "string", required: true, message: "部门名称不能为空" }],
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
        const row = await SystemDeptService.Create(data);
        if (row.deptId) {
            return response.success(ctx, null, "创建成功");
        }
        return response.fail(ctx, "创建失败");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常", JSON.stringify(error));
    }
};
//部门修改
const Update = async (ctx) => {
    const fromData = ctx.request.body;
    const rules = {
        deptId: [{ type: "number", required: true, message: "部门id不能为空" }],
        deptName: [{ type: "string", required: true, message: "部门名称不能为空" }],
    };
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const isExist = !!(await SystemDeptService.GetOne({ deptId: data.deptId }));
        if (!isExist) {
            return response.fail(ctx, "该部门不存在");
        }
        if (!data.parentId) {
            data.parentId = 0;
        }
        const [upCount] = await SystemDeptService.Update(data);
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
//部门列表tree结构
const GetTree = async (ctx) => {
    try {
        const rows = await SystemDeptService.GetAll();
        console.log(rows, 77);
        function arrayToTree(array, parentId) {
            let result = [];
            array.forEach((item) => {
                if (item.parentId == parentId) {
                    item.children = arrayToTree(array, item.deptId);
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
//部门批量删除
const BatchDel = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const delCount = await SystemDeptService.BatchDel(deleteIds);
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
    GetTree,
    BatchDel,
};
