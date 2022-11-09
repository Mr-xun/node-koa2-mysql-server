/*
 * @Author: xunxiao
 * @Date: 2022-10-14 09:42:02
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-09 16:06:24
 * @Description: system model entry
 */
import User from "./User";
import Role from "./Role";
import UserRole from "./UserRole";
import SystemRole from "./SystemRole";
import SystemMenu from "./SystemMenu";
import SystemRoleMenu from "./SystemRoleMenu";

User.belongsToMany(Role, {
    through: {
        model: UserRole,
        unique: false,
    },
    foreignKey: "userId",
    constraints: false,
});
Role.belongsToMany(User, {
    through: {
        model: UserRole,
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
        as: 'role_menu'
    },
    foreignKey: "roleId",
    constraints: false,
});
SystemMenu.belongsToMany(SystemRole, {
    through: {
        model: SystemRoleMenu,
        unique: false,
        as: 'role_menu'
    },
    foreignKey: "menuId",
    constraints: false,
});
export default {
    User,
    Role,
    UserRole,
    SystemRole,
    SystemMenu,
    SystemRoleMenu,
};
