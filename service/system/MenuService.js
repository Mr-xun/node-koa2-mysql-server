/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-27 21:19:34
 * @Description: SystemMenuService
 */
import MenuModel from "@root/models/SystemMenu";
const SystemMenu = MenuModel.scope("hiddenAttr");
//菜单创建
const menuCreate = async (data) => {
    return SystemMenu.create(data);
};

//菜单更新
const menuUpdate = async (data) => {
    return SystemMenu.update(data, { where: { menuId: data.menuId } });
};

//菜单删除
const menuDelete = async (ids) => {
    return SystemMenu.destroy({
        where: {
            menuId: ids,
        },
    });
};

//获取单个菜单
const getMenuOne = async (where) => {
    return SystemMenu.findOne({ where, raw: true });
};
//菜单列表
const getMenuAll = () => {
    return SystemMenu.findAll();
};
//菜单列表分页
const getMenuListByPage = ({ limit, offset }) => {
    return SystemMenu.findAndCountAll({
        limit,
        offset,
    });
};
export default {
    menuCreate,
    menuUpdate,
    menuDelete,
    getMenuOne,
    getMenuAll,
    getMenuListByPage,
};
