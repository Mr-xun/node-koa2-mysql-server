/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-28 13:11:29
 * @Description: SystemRoleService
 */
import { Op } from "sequelize";
import RoleModel from "@root/models/SystemRole";
const SystemRole = RoleModel.scope("hiddenAttr");

//角色创建
const Create = async (data) => {
    return SystemRole.create(data);
};

//角色更新
const Update = async (data) => {
    return SystemRole.update(data, { where: { id: data.roleId } });
};

//角色删除
const BatchDel = async (ids) => {
    return SystemRole.destroy({ where: { id: ids } });
};

//获取单个角色
const GetOne = async (where) => {
    return SystemRole.findOne({ where, raw: true });
};
//角色列表
const GetAll = () => {
    return SystemRole.findAll();
};
//角色列表分页
const GetListByPage = ({ where, limit, offset }) => {
    return SystemRole.findAndCountAll({
        where: {
            roleName: {
                [Op.like]: `%${where.roleName}%`,
            },
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
