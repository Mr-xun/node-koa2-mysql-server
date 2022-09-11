/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-11 16:21:58
 * @Description: UserRoute
 */
const router = require("koa-router")();
const userCtl = require("../controller/UserController");

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

module.exports = router;
