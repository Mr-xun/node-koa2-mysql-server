/*
 * @Author: xunxiao
 * @Date: 2023-02-17 16:55:20
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-20 16:48:42
 * @Description: LogLoginRoute
 */

import Router from "koa-router";
import logLoginCtl from "@root/controller/log/LoginController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/log/login");

//所用登录日志
router.get("/all", ApiAuthMiddleware("loginLog:view"), logLoginCtl.GetAll);

//登录日志列表
router.get("/list", ApiAuthMiddleware("loginLog:view"), logLoginCtl.GetListByPage);

//登录日志删除
router.delete("/delete/:ids", ApiAuthMiddleware("loginLog:delete"), logLoginCtl.BatchDel);

export default router;
