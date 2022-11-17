/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-17 14:20:15
 * @Description: SystemMenuService
 */
import DB from "@root/db";
import systemModel from "@root/models/system";
const SystemMenu = systemModel.SystemMenu.scope("hiddenAttr");
const SystemRole = systemModel.SystemRole;
//菜单创建
const Create = async (data) => {
    return SystemMenu.create(data);
};

//菜单更新
const Update = async (data) => {
    return SystemMenu.update(data, { where: { id: data.menuId } });
};

//菜单删除
const BatchDel = async (ids) => {
    const t = await DB.sequelize.transaction();
    try {
        const instanceData = await SystemMenu.findAll({ where: { id: ids } }, { transaction: t });
        instanceData.forEach(async (ins) => {
            await ins.setSystem_roles([], { force: true, transaction: t });
        });
        const delCount = await SystemMenu.destroy({ where: { id: ids } }, { transaction: t });
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
        t.rollback();
        throw new Error(error);
    }
    return SystemMenu.destroy({
        where: {
            id: ids,
        },
    });
};

//获取单个菜单
const GetOne = async (where) => {
    return SystemMenu.findOne({ where, raw: true });
};
//获取所有菜单
const GetAll = (condition) => {
    return SystemMenu.findAll(condition);
};
//菜单列表分页
const getMenuListByPage = ({ limit, offset }) => {
    return SystemMenu.findAndCountAll({
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
    getMenuListByPage,
};
