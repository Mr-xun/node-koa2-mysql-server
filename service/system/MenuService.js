/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-09 15:16:28
 * @Description: SystemMenuService
 */
import MenuModel from "@root/models/system/SystemMenu";
const SystemMenu = MenuModel.scope("hiddenAttr");
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
