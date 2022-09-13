/*
 * @Author: xunxiao
 * @Date: 2022-09-05 08:25:51
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 16:59:52
 * @Description: AdminRoute
 */
import Router from "koa-router";
import adminCtl from "../controller/AdminController";
const router = new Router();

router.prefix("/admin");

router.get("/", function (ctx, next) {
    ctx.body = "this is a user response!";
});

router.get("/findOne", adminCtl.findOne);
export default router;
