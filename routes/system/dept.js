/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:31:16
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-28 13:42:46
 * @Description: SystemDeptRoute
 */
import Router from "koa-router";
import SysDeptCtl from "@root/controller/system/DeptController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/system/dept");

//部门创建
router.post("/create", ApiAuthMiddleware("dept:delete"), SysDeptCtl.Create);

//部门修改
router.put("/update", ApiAuthMiddleware("dept:delete"), SysDeptCtl.Update);

//部门列表tree结构
router.get("/tree", SysDeptCtl.GetTree);

//部门删除
router.delete("/delete/:ids", ApiAuthMiddleware("dept:delete"), SysDeptCtl.BatchDel);

export default router;
