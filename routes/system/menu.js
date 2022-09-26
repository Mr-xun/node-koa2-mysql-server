/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:31:16
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-26 17:14:34
 * @Description: MenuRoute
 */
import Router from "koa-router";
import sysMenuCtl from "@root/controller/system/MenuController";
const router = new Router();
router.prefix("/api/system/menu");

//菜单创建
router.post("/create", sysMenuCtl.menuCreate);

//菜单修改
router.put("/update", sysMenuCtl.menuUpdate);

//菜单列表tree结构
router.get("/tree", sysMenuCtl.menuGetTree);

//菜单删除
router.delete("/delete/:ids", sysMenuCtl.menuBatchDel);

export default router;
