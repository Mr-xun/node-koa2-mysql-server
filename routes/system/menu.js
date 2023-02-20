/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:31:16
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-26 17:14:34
 * @Description: SystemMenuRoute
 */
import Router from "koa-router";
import sysMenuCtl from "@root/controller/system/MenuController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/system/menu");

//菜单创建
router.post("/create", ApiAuthMiddleware("menu:create"), sysMenuCtl.Create);

//菜单修改
router.put("/update", ApiAuthMiddleware("menu:update"), sysMenuCtl.Update);

//菜单列表tree结构
router.get("/tree", sysMenuCtl.GetTree);

//菜单删除
router.delete("/delete/:ids", ApiAuthMiddleware("menu:delete"), sysMenuCtl.BatchDel);

export default router;
