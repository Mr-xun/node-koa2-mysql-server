/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:51:34
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-29 14:01:08
 * @Description: System_MenuModel
 */

import Sequelize from "sequelize";
import DB from "@root/db";
const SystemMenu = DB.sequelize.define("system_menu", {
    menuId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "菜单Id",
        field: "id",
    },
    menuName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "菜单名称",
        field: "menu_name",
    },
    parentId: {
        type: Sequelize.INTEGER,
        comment: "父菜单ID",
        field: "parent_id",
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
        //类型 1 菜单 2按钮
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: "类型 1 菜单 2按钮",
    },
    orderNum: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "排序",
        field: "order_num",
    },
    icon: {
        type: Sequelize.STRING,
        comment: "图标",
    },
    createTime: {
        type: Sequelize.DATE,
        comment: "创建时间",
        field: "create_time",
    },
    updateTime: {
        type: Sequelize.DATE,
        comment: "更新时间",
        field: "update_time",
    },
});

SystemMenu.sync();
export default SystemMenu;
