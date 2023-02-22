/*
 * @Author: xunxiao
 * @Date: 2022-10-14 09:42:02
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 09:44:09
 * @Description: system model entry
 */
import SystemUser from "./SystemUser";
import SystemRole from "./SystemRole";
import SystemMenu from "./SystemMenu";
import SystemDept from "./SystemDept";
import SystemUserRole from "./SystemUserRole";
import SystemRoleMenu from "./SystemRoleMenu";
//用户关联角色
SystemUser.belongsToMany(SystemRole, {
    through: {
        model: SystemUserRole,
        unique: false,
    },
    foreignKey: "userId",
    constraints: false, // 关闭外键约束
});
SystemRole.belongsToMany(SystemUser, {
    through: {
        model: SystemUserRole,
        unique: false,
    },
    foreignKey: "roleId",
    constraints: false,
});

//角色关联菜单
SystemRole.belongsToMany(SystemMenu, {
    through: {
        model: SystemRoleMenu,
        unique: false,
        as: "role_menu",
    },
    foreignKey: "roleId",
    constraints: false,
});
SystemMenu.belongsToMany(SystemRole, {
    through: {
        model: SystemRoleMenu,
        unique: false,
        as: "role_menu",
    },
    foreignKey: "menuId",
    constraints: false,
});
export default {
    SystemUser,
    SystemRole,
    SystemMenu,
    SystemDept,
    SystemUserRole,
    SystemRoleMenu,
};
