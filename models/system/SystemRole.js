/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:51:34
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 09:35:16
 * @Description: System_RoleModel 系统角色表
 */

import Sequelize from "sequelize";
import DB from "@root/db";
const SystemRole = DB.sequelize.define(
    "system_role",
    {
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
            comment: "角色名称",
            field: "role_name",
        },
        remark: {
            type: Sequelize.STRING,
            comment: "角色说明",
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
        comment: "系统角色表",
    }
);
SystemRole.sync();
export default SystemRole;
