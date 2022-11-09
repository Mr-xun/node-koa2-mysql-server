/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:14:39
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-09 15:05:08
 * @Description: 角色菜单关联表
 */
import Sequelize from "sequelize";
import DB from "@root/db";
const SystemRoleMenu = DB.sequelize.define(
    "system_role_menu",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: "角色id",
            field: "role_id",
        },
        menuId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: "菜单Id",
            field: "menu_id",
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
    },
    {
        comment: "角色菜单关联表",
    }
);
SystemRoleMenu.sync();
export default SystemRoleMenu;
