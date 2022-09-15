/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:13:33
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-15 15:08:43
 * @Description: SystemUserService
 */
import SystemUser from "@root/models/SystemUser";
//用户创建
const userCreate = async (data) => {
    return SystemUser.create(data);
};

//用户更新
const userUpdate = async (data) => {
    return SystemUser.update(data, { where: { id: data.id } });
};

//用户删除
const userDelete = async (ids) => {
    return SystemUser.update({ is_delete: 1 }, { where: { id: ids } });
};

//获取单个用户
const getUserOne = async (where) => {
    return SystemUser.findOne({ where, raw: true, attributes: { exclude: ["password", "is_delete"] } });
};

//用户列表分页
const getUserListByPage = ({ limit, offset }) => {
    return SystemUser.findAndCountAll({
        where: {
            is_delete: 0,
        },
        limit,
        offset,
        attributes: { exclude: ["password", "is_delete"] },
    });
};
export default {
    userUpdate,
    userCreate,
    userDelete,
    getUserOne,
    getUserListByPage,
};
