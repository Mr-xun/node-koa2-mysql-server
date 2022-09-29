/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-29 09:29:58
 * @Description: UserRoute
 */
import Router from "koa-router";
import sysUserCtl from "@root/controller/system/UserController";
const router = new Router();
router.prefix("/api/system/user");

//用户创建
router.post("/create", sysUserCtl.userCreate);

//用户修改
router.put("/update", sysUserCtl.userUpdate);

//用户登录
router.post("/login", sysUserCtl.userLogin);

//用户登录成功
router.put("/loginSuccess", sysUserCtl.userLoginSuccess);

//用户认证
router.post("/verify", sysUserCtl.userVerify);

//所用用户
router.get("/all", sysUserCtl.userAll);

//用户列表
router.get("/list", sysUserCtl.userList);

//用户删除
router.delete("/delete/:ids", sysUserCtl.userBatchDel);

export default router;
