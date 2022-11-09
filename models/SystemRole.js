/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:51:34
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-10-14 09:52:53
 * @Description: System_RoleModel
 */

import Sequelize from "sequelize";
import DB from "../db";
import SystemUser from "./SystemUser";
import SystemUserRole from "./system/UserRole";
const Role = DB.sequelize.define("system_role", {
    roleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "角色Id",
        field: "id",
    },
    roleName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "角色名称",
        field: "role_name",
    },
    remark: {
        type: Sequelize.STRING,
        comment: "角色说明",
    },
    menuIds: {
        type: Sequelize.STRING,
        comment: "关联菜单",
        field: "menu_ids",
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
// // Role.associate = function () {
//     console.log(222);
//     Role.belongsToMany(SystemUser, { through: SystemUserRole,constraints: false, });
// // };

Role.sync();
export default Role;
