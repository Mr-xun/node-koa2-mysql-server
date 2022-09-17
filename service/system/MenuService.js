/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-17 17:58:16
 * @Description: SystemMenuService
 */
import SystemMenu from "@root/models/SystemMenu";
//菜单创建
const menuCreate = async (data) => {
    return SystemMenu.create(data);
};

//菜单更新
const menuUpdate = async (data) => {
    return SystemMenu.update(data, { where: { id: data.id } });
};

//菜单删除
const menuDelete = async (ids) => {
    return SystemMenu.update({ is_delete: 1 }, { where: { id: ids } });
};

//获取单个菜单
const getMenuOne = async (where) => {
    return SystemMenu.findOne({ where, raw: true, attributes: { exclude: ["password", "is_delete"] } });
};

//菜单列表分页
const getMenuListByPage = ({ limit, offset }) => {
    return SystemMenu.findAndCountAll({
        where: {
            is_delete: 0,
        },
        limit,
        offset,
        attributes: { exclude: ["password", "is_delete"] },
    });
};
export default {
    menuCreate,
    menuUpdate,
    menuDelete,
    getMenuOne,
    getMenuListByPage,
};
