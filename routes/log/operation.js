/*
 * @Author: xunxiao
 * @Date: 2023-02-17 16:55:20
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-21 10:39:22
 * @Description: LogOperatorRoute
 */

import Router from "koa-router";
import LogOperationCtl from "@root/controller/log/OperationController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/log/operation");

//所用操作日志
router.get("/all", ApiAuthMiddleware("operationLog:view"), LogOperationCtl.GetAll);

//操作日志列表
router.get("/list", ApiAuthMiddleware("operationLog:view"), LogOperationCtl.GetListByPage);

//操作日志删除
router.delete("/delete/:ids", ApiAuthMiddleware("operationLog:delete"), LogOperationCtl.BatchDel);

export default router;
