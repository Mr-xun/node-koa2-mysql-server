/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:31:16
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-17 10:25:48
 * @Description: RoleRoute
 */
import Router from "koa-router";
import sysRoleCtl from "@root/controller/system/RoleController";
const router = new Router();
router.prefix("/api/system/role");

//角色创建
router.post("/create", sysRoleCtl.Create);

//角色修改
router.put("/update", sysRoleCtl.Update);

//角色列表
router.get("/list", sysRoleCtl.GetListByPage);

//所用角色
router.get("/all", sysRoleCtl.GetAll);

//角色删除
router.delete("/delete/:ids", sysRoleCtl.BatchDel);

export default router;
