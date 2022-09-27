/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-27 17:28:45
 * @Description: SystemRoleService
 */
import SystemRole from "@root/models/SystemRole";
//角色创建
const Create = async (data) => {
    return SystemRole.create(data);
};

//角色更新
const Update = async (data) => {
    return SystemRole.update(data, { where: { id: data.id } });
};

//角色删除
const BatchDel = async (ids) => {
    return SystemRole.destroy({ where: { id: ids } });
};

//获取单个角色
const GetOne = async (where) => {
    return SystemRole.scope("bh").findOne({ where, raw: true});
};
//角色列表
const GetAll = () => {
    return SystemRole.findAll({
        where: {
            is_delete: 0,
        },
        attributes: { exclude: ["isDelete"] },
    });
};
//角色列表分页
const GetListByPage = ({ limit, offset }) => {
    return SystemRole.scope("bh").findAndCountAll({
        where: {
            is_delete: 0,
        },
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
