/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:31:16
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-27 10:47:31
 * @Description: RoleRoute
 */
import Router from "koa-router";
import sysMenuCtl from "@root/controller/system/RoleController";
const router = new Router();
router.prefix("/api/system/role");

//菜单创建
router.post("/create", sysMenuCtl.Create);

//菜单修改
router.put("/update", sysMenuCtl.Update);

//菜单列表
router.get("/list", sysMenuCtl.GetList);

//菜单删除
router.delete("/delete/:ids", sysMenuCtl.BatchDel);

export default router;
