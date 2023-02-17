/*
 * @Author: xunxiao
 * @Date: 2023-02-17 16:11:51
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-17 17:03:35
 * @Description: LogLoginController
 */
import utils from "@root/utils";
import response from "@root/utils/response";
import paginate from "@root/utils/paginate";
import LogLoginService from "@root/service/log/LogLoginService";
//登录日志列表
const GetListByPage = async (ctx) => {
    try {
        let { userName = "", realName = "" } = ctx.query;
        let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
        let condition = {
            where: { userName, realName },
            limit,
            offset,
        };
        const { rows, count } = await LogLoginService.GetListByPage(condition);
        response.success(ctx, paginate(rows, count, limit));
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
const GetAll = async (ctx) => {
    try {
        const rows = await LogLoginService.GetAll();
        response.success(ctx, rows);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
//角色批量删除
const BatchDel = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const { error } = await LogLoginService.BatchDel(deleteIds);
        if (error) {
            return response.fail(ctx, error);
        }
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
export default {
    GetListByPage,
    GetAll,
    BatchDel,
};