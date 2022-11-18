/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-18 11:27:27
 * @Description: UserRoute
 */
import Router from "koa-router";
import sysUserCtl from "@root/controller/system/UserController";
const router = new Router();
router.prefix("/api/system/user");

//用户创建
router.post("/create", sysUserCtl.Create);

//用户修改
router.put("/update", sysUserCtl.Update);

//用户登录
router.post("/login", sysUserCtl.Login);

//用户信息
router.get("/info", sysUserCtl.GetUserInfo);

//用户权限菜单
router.get("/menu", sysUserCtl.GetUserMenu);

//用户认证
router.post("/verify", sysUserCtl.Verify);

//所用用户
router.get("/all", sysUserCtl.GetAll);

//用户列表
router.get("/list", sysUserCtl.GetListByPage);

//用户删除
router.delete("/delete/:ids", sysUserCtl.BatchDel);

export default router;
