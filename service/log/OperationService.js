/*
 * @Author: xunxiao
 * @Date: 2023-02-17 14:56:12
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-24 15:26:05
 * @Description: LogOperationService
 */
import { Op } from "sequelize";
import logModel from "@root/models/log";
const LogOperation = logModel.LogOperation.scope("hiddenAttr");
//操作日志创建
const Create = async (data) => {
    return LogOperation.create(data);
};
//操作日志批量删除
const BatchDel = async (ids) => {
    return LogOperation.destroy({
        where: {
            id: ids,
        },
    });
};
//获取所有操作日志
const GetAll = () => {
    return LogOperation.findAll();
};

//操作日志列表分页
const GetListByPage = ({ where, limit, offset }) => {
    let opWhere = {
        userName: {
            [Op.like]: `%${where.userName}%`,
        },
        realName: {
            [Op.like]: `%${where.realName}%`,
        },
        describe: {
            [Op.like]: `%${where.describe}%`,
        },
    };
    if (where.startTime && where.endTime) {
        opWhere.createTime = {
            [Op.between]: [`${where.startTime}`, `${where.endTime}`],
        };
    }
    return LogOperation.findAndCountAll({
        where: opWhere,
        order: [["createTime", "DESC"]],
        limit,
        offset,
    });
};

export default {
    Create,
    BatchDel,
    GetAll,
    GetListByPage,
};
