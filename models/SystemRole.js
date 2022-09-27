/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:51:34
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-27 17:26:16
 * @Description: System_RoleModel
 */

import Sequelize from "sequelize";
import DB from "../db";
const Role = DB.sequelize.define("system_role", {
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
Role.sync();
Role.scope('bh')
export default Role;
