/*
 * @Author: xunxiao
 * @Date: 2023-02-22 13:58:17
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-23 10:58:54
 * @Description: BasicEnumService
 */
import DB from "@root/db";
import { Op } from "sequelize";
import basicModel from "@root/models/basic";
const BasicEnum = basicModel.BasicEnum.scope("hiddenAttr");
const BasicEnumType = basicModel.BasicEnumType.scope("hiddenAttr");

//枚举字典创建
const EnumCreate = async (data) => {
    const t = await DB.sequelize.transaction();
    try {
        const enumTypeInstance = await BasicEnumType.findByPk(data.typeId);
        const newData = await BasicEnum.create(data, { transaction: t });
        await enumTypeInstance.addBasic_enums(newData, { transaction: t }); //通过setBasic_enums方法在basic_enum表关联typeId
        await t.commit();
        return {
            data: newData,
        };
    } catch (error) {
        console.log(error);
        t.rollback();
        throw new Error(error);
    }
};

//枚举字典更新
const EnumUpdate = async (data) => {
    const instanceData = await BasicEnum.findByPk(data.enumId);
    if (!instanceData) {
        return {
            result: false,
            error: "该枚举字典不存在",
        };
    }
    return BasicEnum.update(data, {
        where: {
            id: data.enumId,
        },
    });
};

//枚举字典批量删除
const EnumBatchDelete = async (ids) => {
    return BasicEnum.destroy({
        where: {
            id: ids,
        },
    });
};

//获取单个枚举字典
const EnumGetOne = async (where) => {
    return BasicEnum.findOne({ where, raw: true });
};

//获取全部枚举字典
const EnumGetAll = async (where) => {
    return BasicEnum.findAll({
        where,
        include: {
            model: BasicEnumType,
            attributes: ["typeId", "typeCode", "typeName"],
        },
        attributes: { exclude: ["basicEnumTypeTypeId"] },
    });
};

//获取全部枚举字典通过type
const EnumGetAllByType = async (where) => {
    return BasicEnum.findAll({
        include: {
            model: BasicEnumType,
            where: {
                typeId: {
                    [Op.like]: `%${where.typeId}`,
                },
                typeCode: {
                    [Op.like]: `%${where.typeCode}`,
                },
            },
            attributes: ["typeId", "typeCode", "typeName"],
        },
        attributes: { exclude: ["basicEnumTypeTypeId"] },
    });
};

//枚举字典列表分页
const EnumListByPage = async ({ where, limit, offset }) => {
    return BasicEnum.findAndCountAll({
        where: {
            enumName: {
                [Op.like]: `%${where.enumName}%`,
            },
            enumCode: {
                [Op.like]: `%${where.enumCode}%`,
            },
        },
        include: {
            model: BasicEnumType,
            attributes: ["typeId", "typeCode", "typeName"],
        },
        limit,
        offset,
        attributes: { exclude: ["basicEnumTypeTypeId"] },
        distinct: true,
    });
};
export default {
    EnumCreate,
    EnumUpdate,
    EnumBatchDelete,
    EnumGetOne,
    EnumGetAll,
    EnumGetAllByType,
    EnumListByPage,
};
