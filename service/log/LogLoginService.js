/*
 * @Author: xunxiao
 * @Date: 2023-02-17 14:56:12
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-17 16:11:13
 * @Description: LogLoginService
 */
import { Op } from "sequelize";
import logModel from "@root/models/log";
const LogLogin = logModel.LogLogin.scope("hiddenAttr");
//登录日志创建
const Create = async (data) => {
    return LogLogin.create(data);
};
//登录日志批量删除
const BatchDel = async (ids) => {
    return LogLogin.destroy({
        where: {
            id: ids,
        },
    });
};
//获取所有登录日志
const GetAll = () => {
    return LogLogin.findAll();
};

//登录日志列表分页
const GetListByPage = ({ where, limit, offset }) => {
    return LogLogin.findAndCountAll({
        where: {
            userName: {
                [Op.like]: `%${where.userName}%`,
            },
            realName: {
                [Op.like]: `%${where.realName}%`,
            },
        },
        limit,
        offset,
    });
};

export default {
    Create,
    BatchDel,
    GetAll,
    GetListByPage
};
