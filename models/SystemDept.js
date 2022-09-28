/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 16:51:34
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-28 13:29:44
 * @Description: System_DeptModel
 */

import Sequelize from "sequelize";
import DB from "../db";
const Dept = DB.sequelize.define("system_dept", {
    deptId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "部门Id",
        field: "id",
    },
    deptName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "部门名称",
        field: "dept_name",
    },
    parentId: {
        type: Sequelize.INTEGER,
        comment: "父菜单ID",
        field: "parent_id",
    },
    orderNum: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "排序",
        field: "order_num",
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

Dept.sync();
export default Dept;
