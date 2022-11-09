/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:14:39
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-10-14 09:51:12
 * @Description: System_UserModel
 */
import Sequelize from "sequelize";
import DB from "@root/db";
const User = DB.sequelize.define("system_user", {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "用户Id",
        field: "id",
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名",
        field: "user_name",
    },
    realName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "姓名",
        field: "real_name",
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "用户密码",
    },
    gender: {
        //性别 1男 2女 3保密
        type: Sequelize.INTEGER,
        values: [1, 2, 3],
        defaultValue: 3,
        comment: "性别",
    },
    avatar: {
        type: Sequelize.STRING,
        comment: "用户头像",
    },
    mobile: {
        type: Sequelize.STRING,
        comment: "联系电话",
    },
    email: {
        type: Sequelize.STRING,
        comment: "电子邮箱",
    },
    deptId: {
        type: Sequelize.INTEGER,
        comment: "部门Id",
        field: "dept_id",
    },
    orgId: {
        type: Sequelize.INTEGER,
        comment: "机构Id",
        field: "org_id",
    },
    status: {
        //状态 1有效 2禁用
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: "状态",
    },
    description: {
        type: Sequelize.STRING,
        comment: "描述说明",
    },
    lastLoginTime: {
        type: Sequelize.DATE,
        comment: "上次登录时间",
        field: "last_login_time",
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
User.sync();
export default User;
