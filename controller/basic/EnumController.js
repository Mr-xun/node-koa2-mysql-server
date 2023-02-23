/*
 * @Author: xunxiao
 * @Date: 2023-02-22 13:57:41
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-23 11:00:50
 * @Description: BasicEnumController
 */

import utils from "@root/utils";
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import paginate from "@root/utils/paginate";
import BasicEnumTypeService from "@root/service/basic/EnumTypeService";
import BasicEnumService from "@root/service/basic/EnumService";

//枚举字典创建
const EnumCreate = async (ctx) => {
    const rules = {
        typeId: [{ type: "number", required: true, message: "枚举类型id不能为空" }],
        enumName: [{ type: "string", required: true, message: "字典名称不能为空" }],
        enumCode: [{ type: "string", required: true, message: "字典编码不能为空" }],
    };
    const formData = ctx.request.body;
    const { data, error } = await validate(formData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const enumTypeRow = await BasicEnumTypeService.EnumTypeGetById(data.typeId);
        if (!enumTypeRow) {
            return response.fail(ctx, "该枚举类型不存在");
        }
        for (let item of enumTypeRow.basic_enums) {
            if (item.enumCode == data.enumCode) {
                return response.fail(ctx, "该枚举类型下字典编码已存在");
            }
            if (item.enumName == data.enumName) {
                return response.fail(ctx, "该枚举类型下字典名称已存在");
            }
        }
        const { error } = await BasicEnumService.EnumCreate(data);
        if (error) {
            return response.fail(ctx, "创建失败");
        }
        ctx.state.operationLog.describe = "枚举字典创建";
        return response.success(ctx, null, "创建成功");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//枚举字典修改
const EnumUpdate = async (ctx) => {
    const fromData = ctx.request.body;
    const rules = {
        typeId: [{ type: "number", required: true, message: "枚举类型id不能为空" }],
        enumId: [{ type: "number", required: true, message: "字典id不能为空" }],
        enumName: [{ type: "string", required: true, message: "字典名称不能为空" }],
        enumCode: [{ type: "string", required: true, message: "字典编码不能为空" }],
    };
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const enumTypeRow = await BasicEnumTypeService.EnumTypeGetById(data.typeId);
        if (!enumTypeRow) {
            return response.fail(ctx, "该枚举类型不存在");
        }
        for (let item of enumTypeRow.basic_enums) {
            if (item.enumCode == data.enumCode && item.enumId != data.enumId) {
                return response.fail(ctx, "该枚举类型下字典编码已存在");
            }
            if (item.enumName == data.enumName && item.enumId != data.enumId) {
                return response.fail(ctx, "该枚举类型下字典名称已存在");
            }
        }
        const { error } = await BasicEnumService.EnumUpdate(data);
        if (error) {
            return response.fail(ctx, error);
        }
        ctx.state.operationLog.describe = "枚举字典修改";
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//枚举字典列表
const EnumListByPage = async (ctx) => {
    try {
        let { enumCode = "", enumName = "" } = ctx.query;
        let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
        let condition = {
            where: { enumCode, enumName },
            limit,
            offset,
        };
        const { rows, count } = await BasicEnumService.EnumListByPage(condition);
        let list = rows.map((row) => row.dataValues);
        list.forEach((item) => {
            item.typeId = item.basic_enum_type?.dataValues?.typeId;
            item.typeCode = item.basic_enum_type?.dataValues?.typeCode;
            item.typeName = item.basic_enum_type?.dataValues?.typeName;
            delete item.basic_enum_type;
        });
        response.success(ctx, paginate(list, count, limit));
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//全部枚举字典
const EnumGetAll = async (ctx) => {
    try {
        const rows = await BasicEnumService.EnumGetAll();
        let list = rows.map((row) => row.dataValues);
        console.log(list,123)
        list.forEach((item) => {
            item.typeId = item.basic_enum_type?.dataValues?.typeId;
            item.typeCode = item.basic_enum_type?.dataValues?.typeCode;
            item.typeName = item.basic_enum_type?.dataValues?.typeName;
            delete item.basic_enum_type;
        });
        response.success(ctx, rows);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//通过typeCode获取枚举字典
const EnumGetAllByType = async (ctx) => {
    try {
        let { typeId = "", typeCode = "" } = ctx.query;
        const rows = await BasicEnumService.EnumGetAllByType({ typeId, typeCode });
        let list = rows.map((row) => row.dataValues);
        list.forEach((item) => {
            item.typeId = item.basic_enum_type?.dataValues?.typeId;
            item.typeCode = item.basic_enum_type?.dataValues?.typeCode;
            item.typeName = item.basic_enum_type?.dataValues?.typeName;
            delete item.basic_enum_type;
        });
        response.success(ctx, rows);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//枚举字典批量删除
const EnumBatchDelete = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const { error } = await BasicEnumService.EnumBatchDelete(deleteIds);
        if (error) {
            return response.fail(ctx, error);
        }
        ctx.state.operationLog.describe = "枚举字典删除";
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
export default {
    EnumCreate,
    EnumUpdate,
    EnumListByPage,
    EnumGetAll,
    EnumGetAllByType,
    EnumBatchDelete,
};
