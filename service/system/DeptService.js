/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-17 09:53:55
 * @Description: SystemDeptService
 */
import systemModel from "@root/models/system";
const SystemDept = systemModel.SystemDept.scope("hiddenAttr");
//部门创建
const Create = async (data) => {
    return SystemDept.create(data);
};

//部门更新
const Update = async (data) => {
    return SystemDept.update(data, { where: { id: data.deptId } });
};

//部门批量删除
const BatchDel = async (ids) => {
    return SystemDept.destroy({
        where: {
            id: ids,
        },
    });
};

//获取单个部门
const GetOne = async (where) => {
    return SystemDept.findOne({ where, raw: true });
};
//获取所有部门
const GetAll = (condition) => {
    return SystemDept.findAll(condition);
};
//部门列表分页
const GetListByPage = ({ limit, offset }) => {
    return SystemDept.findAndCountAll({
        limit,
        offset,
    });
};
export default {
    Create,
    Update,
    BatchDel,
    GetOne,
    GetAll,
    GetListByPage,
};
