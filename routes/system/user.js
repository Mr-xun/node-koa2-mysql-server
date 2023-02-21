/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-21 15:35:00
 * @Description: SystemUserRoute
 */
import Router from "koa-router";
import sysUserCtl from "@root/controller/system/UserController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/system/user");

//用户创建
router.post("/create", ApiAuthMiddleware("user:create"), sysUserCtl.Create);

//用户修改
router.put("/update", ApiAuthMiddleware("user:update"), sysUserCtl.Update);

//用户登录
router.post("/login", sysUserCtl.Login);

//用户信息
router.get("/info", sysUserCtl.GetUserInfo);

//用户权限菜单
router.get("/menu", sysUserCtl.GetUserMenu);

//用户认证
router.post("/verify", sysUserCtl.Verify);

//所用用户
router.get("/all", ApiAuthMiddleware("user:view"), sysUserCtl.GetAll);

//用户列表
router.get("/list", ApiAuthMiddleware("user:view"), sysUserCtl.GetListByPage);

//用户删除
router.delete("/delete/:ids", ApiAuthMiddleware("user:delete"), sysUserCtl.BatchDel);

//用户密码重置
router.put("/password/reset", ApiAuthMiddleware("user:passwordReset"), sysUserCtl.PasswordReset);

//用户修改密码
router.put("/password/update", ApiAuthMiddleware("user:update"), sysUserCtl.PasswordUpdate);

export default router;
