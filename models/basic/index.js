/*
 * @Author: xunxiao
 * @Date: 2023-02-22 09:42:02
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-23 10:55:37
 * @Description: basic model entry
 */
import BasicEnum from "./BasicEnum";
import BasicEnumType from "./BasicEnumType";

//枚举类型关联枚举 一对多
BasicEnumType.hasMany(BasicEnum, { constraints: false });
BasicEnum.belongsTo(BasicEnumType, { constraints: false });
// BasicEnumType.sync({ force: true }).then((d) => {
//     //表同步完成后注释掉
//     console.log("BasicEnumType表同步完成");
//     BasicEnum.sync({ force: true }).then((d) => {
//         console.log("BasicEnum表同步完成");
//     });
// });
export default {
    BasicEnum,
    BasicEnumType,
};
