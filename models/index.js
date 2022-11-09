/*
 * @Author: xunxiao
 * @Date: 2022-09-30 11:21:17
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-30 13:04:24
 * @Description: model entry
 */
import Sequelize from "sequelize";
import DB from "../db";
export const SystemDept = DB.sequelize.import(__dirname + "/SystemDept.js");
console.log(SystemDept, "SystemDept");
