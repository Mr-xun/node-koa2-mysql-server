/*
 * @Author: xunxiao
 * @Date: 2023-02-22 10:19:50
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-23 10:38:26
 * @Description: BasicEnumTypeController
 */
import utils from "@root/utils";
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import paginate from "@root/utils/paginate";
import BasicEnumTypeService from "@root/service/basic/EnumTypeService";

//枚举类型创建
const EnumTypeCreate = async (ctx) => {
    const rules = {
        typeCode: [{ type: "string", required: true, message: "枚举类型编码不能为空" }],
        typeName: [{ type: "string", required: true, message: "枚举类型名称不能为空" }],
    };
    const formData = ctx.request.body;
    const { data, error } = await validate(formData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const isExistEnumTypeCode = !!(await BasicEnumTypeService.EnumTypeGetOne({ typeCode: data.typeCode }));
        if (isExistEnumTypeCode) {
            return response.fail(ctx, "该枚举类型编码已存在");
        }
        const isExistEnumTypeName = !!(await BasicEnumTypeService.EnumTypeGetOne({ typeName: data.typeName }));
        if (isExistEnumTypeName) {
            return response.fail(ctx, "该枚举类型名称已存在");
        }
        const { error } = await BasicEnumTypeService.EnumTypeCreate(data);
        if (error) {
            return response.fail(ctx, "创建失败");
        }
        ctx.state.operationLog.describe = "枚举类型创建";
        return response.success(ctx, null, "创建成功");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//枚举类型修改
const EnumTypeUpdate = async (ctx) => {
    const fromData = ctx.request.body;
    const rules = {
        typeId: [{ type: "number", required: true, message: "枚举类型id不能为空" }],
        typeName: [{ type: "string", required: true, message: "枚举类型名称不能为空" }],
        typeCode: [{ type: "string", required: true, message: "枚举类型编码不能为空" }],
    };
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const existEnumTypeByCode = await BasicEnumTypeService.EnumTypeGetOne({ typeCode: data.typeCode });
        if (existEnumTypeByCode && existEnumTypeByCode.typeId != data.typeId) {
            return response.fail(ctx, "该枚举类型编码已存在");
        }
        const existEnumTypeByName = await BasicEnumTypeService.EnumTypeGetOne({ typeName: data.typeName });
        if (existEnumTypeByName && existEnumTypeByName.typeId != data.typeId) {
            return response.fail(ctx, "该枚举类型名称已存在");
        }
        const { error } = await BasicEnumTypeService.EnumTypeUpdate(data);
        if (error) {
            return response.fail(ctx, error);
        }
        ctx.state.operationLog.describe = "枚举类型修改";
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//枚举类型列表
const EnumTypeListByPage = async (ctx) => {
    try {
        let { typeCode = "", typeName = "" } = ctx.query;
        let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
        let condition = {
            where: { typeCode, typeName },
            limit,
            offset,
        };
        const { rows, count } = await BasicEnumTypeService.EnumTypeListByPage(condition);
        response.success(ctx, paginate(rows, count, limit));
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//全部枚举类型
const EnumTypeGetAll = async (ctx) => {
    try {
        const rows = await BasicEnumTypeService.EnumTypeGetAll();
        response.success(ctx, rows);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//获取全部枚举类型字典
const EnumTypeAllDict = async (ctx) => {
    try {
        const rows = await BasicEnumTypeService.EnumTypeAllDict();
        let list = rows.map((row) => row.dataValues);
        list.forEach((item) => {
            item.enumList = item.basic_enums;
            delete item.basic_enums;
        });
        response.success(ctx, list);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//枚举类型批量删除
const EnumTypeBatchDelete = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const { error } = await BasicEnumTypeService.EnumTypeBatchDelete(deleteIds);
        if (error) {
            return response.fail(ctx, error);
        }
        ctx.state.operationLog.describe = "枚举类型删除";
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
export default {
    EnumTypeCreate,
    EnumTypeUpdate,
    EnumTypeListByPage,
    EnumTypeGetAll,
    EnumTypeAllDict,
    EnumTypeBatchDelete,
};
