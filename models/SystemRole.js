/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:51:34
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-27 17:14:23
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
    isDelete: {
        //是否删除 1是 0 否
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "是否删除",
        field: "is_delete",
    },
});
Role.sync();
Role.scope('bh')
export default Role;
