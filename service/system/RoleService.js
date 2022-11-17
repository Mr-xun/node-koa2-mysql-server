/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-17 09:42:23
 * @Description: SystemRoleService
 */
import DB from "@root/db";
import { Op } from "sequelize";
import systemModel from "@root/models/system";
const SystemMenu = systemModel.SystemMenu;
const SystemRole = systemModel.SystemRole.scope("hiddenAttr");

//角色创建
const Create = async (data) => {
    const t = await DB.sequelize.transaction();
    try {
        const newData = await SystemRole.create(data, { transaction: t });
        const menus = await SystemMenu.findAll(
            {
                where: {
                    id: data.menuIds,
                },
            },
            { transaction: t }
        );
        await newData.setSystem_menus(menus, { transaction: t }); //通过setSystem_menus方法在system_role_menus表添加记录
        await t.commit();
        return {
            data: newData,
        };
    } catch (error) {
        console.log(error);
        await t.rollback();
        throw new Error(error);
    }
};

//角色更新
const Update = async (data) => {
    const t = await DB.sequelize.transaction();
    try {
        const instanceData = await SystemRole.findByPk(data.roleId, { transaction: t });
        if (!instanceData) {
            return {
                result: false,
                error: "该角色不存在",
            };
        }
        const [upCount] = await SystemRole.update(data, { where: { id: data.roleId } }, { transaction: t });
        if (upCount) {
            const menus = await SystemMenu.findAll(
                {
                    where: {
                        id: data.menuIds,
                    },
                },
                { transaction: t }
            );
            await instanceData.setSystem_menus(menus, { force: true, transaction: t }); //通过setSystem_menus方法在system_role_menus表添加记录
            await t.commit();
            return {
                result: true,
            };
        } else {
            return {
                result: false,
                error: "更新失败",
            };
        }
    } catch (error) {
        console.log(error);
        await t.rollback();
        throw new Error(error);
    }
};

//角色删除
const BatchDel = async (ids) => {
    const t = await DB.sequelize.transaction();
    try {
        const instanceData = await SystemRole.findAll({ where: { roleId: ids } }, { transaction: t });
        instanceData.forEach(async (ins) => {
            await ins.setSystem_menus([], { force: true, transaction: t }); //通过setSystem_menus方法在system_role_menus表添加记录
        });
        await SystemRole.destroy({ where: { id: ids } }, { transaction: t });
        await t.commit();
        return {
            result: true,
        };
    } catch (error) {
        console.log(error);
        await t.rollback();
        throw new Error(error);
    }
};

//获取单个角色
const GetOne = async (where) => {
    return SystemRole.findOne({ where, raw: true });
};
//获取所有角色
const GetAll = (where) => {
    return SystemRole.findAll(where);
};
//角色列表分页
const GetListByPage = ({ where, limit, offset }) => {
    return SystemRole.findAndCountAll({
        include: [
            {
                model: SystemMenu,
                attributes: ["id"],
                through: { attributes: [] }, // 隐藏中间表字段
            },
        ],
        where: {
            roleName: {
                [Op.like]: `%${where.roleName}%`,
            },
        },
        limit,
        offset,
    });
};
export default {
    Create,
    Update,
    BatchDel,
    GetOne,
    GetAll,
    GetListByPage,
};
