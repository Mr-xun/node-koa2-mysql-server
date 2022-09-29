/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:13:33
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-29 09:27:08
 * @Description: SystemUserService
 */
import UserModel from "@root/models/SystemUser";
const SystemUser = UserModel.scope("hiddenAttr");

//用户创建
const userCreate = async (data) => {
    return SystemUser.create(data);
};

//用户更新
const userUpdate = async (data) => {
    return SystemUser.update(data, { where: { id: data.userId } });
};

//用户批量删除
const userBatchDel = async (ids) => {
    return SystemUser.destroy({ where: { id: ids } });
};

//获取单个用户
const getUserOne = async (where) => {
    return SystemUser.findOne({ where, raw: true, attributes: { exclude: ["password"] } });
};

//获取所有用户
const getUserALl = () => {
    return SystemUser.findAll();
};

//用户列表分页
const getUserListByPage = ({ limit, offset }) => {
    return SystemUser.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ["password"] },
    });
};

export default {
    userUpdate,
    userCreate,
    userBatchDel,
    getUserOne,
    getUserALl,
    getUserListByPage,
};
