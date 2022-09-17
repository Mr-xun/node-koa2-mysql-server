/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:31:16
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-17 17:37:18
 * @Description: MenuRoute
 */
import Router from "koa-router";
import sysMenuCtl from "@root/controller/system/MenuController";
const router = new Router();
router.prefix("/api/system/menu");

//菜单创建
router.post("/create", sysMenuCtl.menuCreate);

// //菜单修改
// router.put("/update", sysMenuCtl.menuUpdate);

// //菜单登录
// router.post("/login", sysMenuCtl.menuLogin);

// //菜单认证
// router.post("/verify", sysMenuCtl.menuVerify);

// //菜单列表
// router.get("/list", sysMenuCtl.menuList);

// //菜单删除
// router.delete("/delete/:ids", sysMenuCtl.menuBatchDel);

export default router;
