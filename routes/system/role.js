/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:31:16
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-17 10:28:32
 * @Description: SystemRoleRoute
 */
import Router from "koa-router";
import sysRoleCtl from "@root/controller/system/RoleController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/system/role");

//角色创建
router.post("/create", ApiAuthMiddleware("role:create"), sysRoleCtl.Create);

//角色修改
router.put("/update", ApiAuthMiddleware("role:update"), sysRoleCtl.Update);

//角色列表
router.get("/list", ApiAuthMiddleware("role:view"), sysRoleCtl.GetListByPage);

//所用角色
router.get("/all", sysRoleCtl.GetAll);

//角色删除
router.delete("/delete/:ids", ApiAuthMiddleware("role:delete"), sysRoleCtl.BatchDel);

export default router;
