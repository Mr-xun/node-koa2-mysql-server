/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:51:34
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-26 16:48:32
 * @Description: System_MenuModel
 */

import Sequelize from "sequelize";
import DB from "../db";
const Menu = DB.sequelize.define("system_menu", {
    menu_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "菜单名称",
    },
    parent_id: {
        type: Sequelize.INTEGER,
        comment: "父菜单ID",
    },
    path: {
        type: Sequelize.STRING,
        comment: "菜单路径",
    },
    component: {
        type: Sequelize.STRING,
        comment: "组件",
    },
    perms: {
        type: Sequelize.STRING,
        comment: "权限",
    },
    type: {
        //类型 0 菜单 1按钮
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "类型",
    },
    order_num: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "排序",
    },
    icon: {
        type: Sequelize.STRING,
        comment: "图标",
    },
    is_delete: {
        //是否删除 1是 0 否
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "是否删除",
    },
});

Menu.sync();
export default Menu;
