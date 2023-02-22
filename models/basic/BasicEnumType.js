/*
 * @Author: xunxiao
 * @Date: 2023-02-22 09:26:03
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 09:43:22
 * @Description: Basic_Enum_Type Model 基础枚举类型表
 */
import Sequelize from "sequelize";
import DB from "@root/db";
const BasicEnumType = DB.sequelize.define(
    "basic_enum_type",
    {
        typeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "枚举类型ID",
            field: "id",
        },
        typeCode: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "枚举类型编码",
            field: "type_code",
        },
        typeName: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: "枚举类型名称",
            field: "type_name",
        },
        remark: {
            type: Sequelize.STRING,
            comment: "枚举类型说明",
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
        comment: "枚举类型表",
    }
);
// BasicEnumType.sync();
export default BasicEnumType;
