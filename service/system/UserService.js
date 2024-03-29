/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:13:33
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-24 15:33:16
 * @Description: SystemUserService
 */
import DB from "@root/db";
import { Op } from "sequelize";
import systemModel from "@root/models/system";
const SystemUser = systemModel.SystemUser.scope("hiddenAttr");
const SystemRole = systemModel.SystemRole.scope("hiddenAttr");
const SystemMenu = systemModel.SystemMenu.scope("hiddenAttr");

//用户创建
const Create = async (data) => {
    const t = await DB.sequelize.transaction();
    try {
        const newData = await SystemUser.create(data, { transaction: t });
        const roles = await SystemRole.findAll(
            {
                where: {
                    id: data.roleIds,
                },
            },
            { transaction: t }
        );
        await newData.setSystem_roles(roles, { transaction: t }); //通过setSystem_roles方法在system_user_role表添加记录
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

//用户更新
const Update = async (data) => {
    const t = await DB.sequelize.transaction();
    try {
        const instanceData = await SystemUser.findByPk(data.userId, { transaction: t });
        if (!instanceData) {
            return {
                result: false,
                error: "该用户不存在",
            };
        }
        const [upCount] = await SystemUser.update(data, { where: { id: data.userId } }, { transaction: t });
        if (upCount) {
            if (data.roleIds) {
                const roles = await SystemRole.findAll(
                    {
                        where: {
                            id: data.roleIds,
                        },
                    },
                    { transaction: t }
                );
                await instanceData.setSystem_roles(roles, { force: true, transaction: t });
            }
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
        t.rollback();
        throw new Error(error);
    }
};

//用户批量删除
const BatchDel = async (ids) => {
    const t = await DB.sequelize.transaction();
    try {
        const instanceData = await SystemUser.findAll({ where: { id: ids } }, { transaction: t });
        instanceData.forEach(async (ins) => {
            await ins.setSystem_roles([], { force: true, transaction: t });
        });
        const delCount = await SystemUser.destroy({ where: { id: ids } }, { transaction: t });
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
};

//获取单个用户
const GetOne = async (where) => {
    return SystemUser.findOne({
        where,
        raw: true,
    });
};

//根据id获取用户信息
const GetUserById = async (userId) => {
    return SystemUser.findByPk(userId, {
        include: [
            {
                model: SystemRole,
                attributes: ["id", "roleName"],
                through: { attributes: [] }, // 隐藏中间表字段
                include: [
                    {
                        model: SystemMenu,
                        attributes: ["menuId", "menuName", "parentId", "path", "component", "perms", "orderNum", "icon", "type"],
                        through: { attributes: [] }, // 隐藏中间表字段
                    },
                ],
            },
        ],
        attributes: { exclude: ["password"] },
    });
};

//获取所有用户
const GetAll = () => {
    return SystemUser.findAll();
};

//用户列表分页
const GetListByPage = ({ where, limit, offset }) => {
    //连表查询的方式，当前的 count 会是所有联表的综合。需在 findAndCountAll 参数中添加 distinct: true。
    return SystemUser.findAndCountAll({
        where: {
            userName: {
                [Op.like]: `%${where.userName}%`,
            },
            realName: {
                [Op.like]: `%${where.realName}%`,
            },
        },
        order: [["createTime", "DESC"]],
        limit,
        offset,
        attributes: { exclude: ["password"] },
        include: [
            {
                model: SystemRole,
                attributes: ["id", "roleName"],
                through: { attributes: [] }, // 隐藏中间表字段
            },
        ],
        distinct: true,
    });
};

export default {
    Create,
    Update,
    BatchDel,
    GetOne,
    GetUserById,
    GetAll,
    GetListByPage,
};
