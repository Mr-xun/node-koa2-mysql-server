/*
 * @Author: xunxiao
 * @Date: 2023-02-22 09:46:00
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-23 10:51:51
 * @Description: BasicEnumTypeService
 */
import DB from "@root/db";
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
    const t = await DB.sequelize.transaction();
    try {
        const instanceData = await BasicEnumType.findAll({ where: { id: ids } }, { transaction: t });
        instanceData.forEach(async (ins) => {
            await ins.setBasic_enums([], { force: true, transaction: t });
        });
        const delCount = await BasicEnumType.destroy({ where: { id: ids } }, { transaction: t });
        if (delCount) {
            await t.commit();
            return {
                result: true,
            };
        } else {
            return {
                result: false,
                error: "删除失败",
            };
        }
    } catch (error) {
        console.log(error);
        await t.rollback();
        throw new Error(error);
    }

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

//获取全部枚举类型字典
const EnumTypeAllDict = async () => {
    return BasicEnumType.findAll({
        include: {
            model: BasicEnum,
            attributes: ["enumId", "enumCode", "enumName", "shorthandCode"],
        },
        attributes: { exclude: ["createTime","updateTime",] },
    });
};

//通过id获取枚举类型
const EnumTypeGetById = async (typeId) => {
    return BasicEnumType.findByPk(typeId, {
        include: {
            model: BasicEnum,
        },
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
    EnumTypeAllDict,
    EnumTypeGetById,
    EnumTypeListByPage,
};
