/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:00:56
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-09 16:39:00
 * @Description: SystemRoleService
 */
import { Op } from "sequelize";
import systemModel from "@root/models/system";
const SystemMenu = systemModel.SystemMenu;
const SystemRole = systemModel.SystemRole.scope("hiddenAttr");

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
//获取所有角色
const GetAll = (where) => {
    return SystemRole.findAll(where);
};
//角色列表分页
const GetListByPage = ({ where, limit, offset }) => {
    return SystemRole.findAndCountAll({
        include: [
            {
                model: SystemMenu,
                attributes: ["id"],
                through: { attributes: [] }, // 隐藏中间表字段
            },
        ],
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
