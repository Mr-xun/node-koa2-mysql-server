/*
 * @Author: xunxiao
 * @Date: 2023-02-22 09:46:00
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 17:18:00
 * @Description: BasicEnumTypeService
 */
import { Op } from "sequelize";
import basicModel from "@root/models/basic";
const BasicEnumType = basicModel.BasicEnumType.scope("hiddenAttr");
const BasicEnum = basicModel.BasicEnum.scope("hiddenAttr");

//枚举类型创建
const EnumTypeCreate = async (data) => {
    return BasicEnumType.create(data);
};

//枚举类型更新
const EnumTypeUpdate = async (data) => {
    const instanceData = await BasicEnumType.findByPk(data.typeId);
    if (!instanceData) {
        return {
            result: false,
            error: "该枚举类型不存在",
        };
    }
    return BasicEnumType.update(data, {
        where: {
            id: data.typeId,
        },
    });
};

//枚举类型批量删除
const EnumTypeBatchDelete = async (ids) => {
    return BasicEnumType.destroy({
        where: {
            id: ids,
        },
    });
};

//获取单个枚举类型
const EnumTypeGetOne = async (where) => {
    return BasicEnumType.findOne({ where, raw: true });
};

//获取全部枚举类型
const EnumTypeGetAll = async (condition) => {
    return BasicEnumType.findAll(condition);
};
//通过id获取枚举类型
const EnumTypeGetById = async (typeId) => {
    return BasicEnumType.findByPk(typeId, {
        include: {
            model: BasicEnum,
        },
        attributes: { exclude: [""] },
    });
};
//枚举类型列表分页
const EnumTypeListByPage = async ({ where, limit, offset }) => {
    return BasicEnumType.findAndCountAll({
        where: {
            typeName: {
                [Op.like]: `%${where.typeName}%`,
            },
            typeCode: {
                [Op.like]: `%${where.typeCode}%`,
            },
        },
        limit,
        offset,
    });
};
export default {
    EnumTypeCreate,
    EnumTypeUpdate,
    EnumTypeBatchDelete,
    EnumTypeGetOne,
    EnumTypeGetAll,
    EnumTypeGetById,
    EnumTypeListByPage,
};
