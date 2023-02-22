/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:14:39
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 09:34:05
 * @Description: System_UserRoleModel 用户角色关联表
 */
import Sequelize from "sequelize";
import DB from "@root/db";
const UserRole = DB.sequelize.define(
    "system_user_role",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: "用户Id",
            field: "user_id",
        },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: "角色id",
            field: "role_id",
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
        comment: "用户角色表",
    }
);
UserRole.sync();
export default UserRole;
