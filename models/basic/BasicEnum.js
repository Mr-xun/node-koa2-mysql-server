/*
 * @Author: xunxiao
 * @Date: 2023-02-22 09:31:24
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 15:08:01
 * @Description: Basic_EnumModel 基础枚举表
 */
import Sequelize from "sequelize";
import DB from "@root/db";
const BasicEnum = DB.sequelize.define("basic_enum", {
    enumId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "枚举ID",
        field: "id",
    },
    enumCode:{
        type: Sequelize.STRING,
        allowNull: false,
        comment: "枚举编码",
        field: "enum_code",
    },
    enumName:{
        type: Sequelize.STRING,
        allowNull: false,
        comment: "枚举名称",
        field: "enum_name",
    },
    shorthandCode:{
        type: Sequelize.STRING,
        comment: "速记码",
        field: "shorthand_code",
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
    comment: "基础枚举表",
});
// BasicEnum.sync();

export default BasicEnum;
