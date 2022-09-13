/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 17:01:23
 * @Description: UserRoute
 */
import Router from "koa-router";
import userCtl from "../controller/UserController";
const router = new Router();
router.prefix("/user");

router.get("/", function (ctx, next) {
    ctx.body = "this is a user response!";
});

router.get("/bar", function (ctx, next) {
    ctx.body = "this is a user/bar response";
});

//用户登录
router.post("/login", userCtl.userLogin);

//用户认证
router.post("/verify", userCtl.userVerify);

//用户列表
router.get("/list", userCtl.userList);

export default router;
