/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:51:34
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-17 09:17:01
 * @Description: System_RoleModel
 */

import Sequelize from "sequelize";
import DB from "@root/db";
const SystemRole = DB.sequelize.define("system_role", {
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
});
SystemRole.sync();
export default SystemRole;
