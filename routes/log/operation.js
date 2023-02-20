/*
 * @Author: xunxiao
 * @Date: 2023-02-17 16:55:20
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-20 16:57:18
 * @Description: LogOperatorRoute
 */

import Router from "koa-router";
import LogOperationCtl from "@root/controller/log/LogOperationController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/log/operation");

//所用操作日志
router.get("/all", ApiAuthMiddleware("loginLog:view"), LogOperationCtl.GetAll);

//操作日志列表
router.get("/list", ApiAuthMiddleware("loginLog:view"), LogOperationCtl.GetListByPage);

//操作日志删除
router.delete("/delete/:ids", ApiAuthMiddleware("loginLog:delete"), LogOperationCtl.BatchDel);

export default router;
