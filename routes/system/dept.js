/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-17 17:31:16
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-28 13:42:46
 * @Description: DeptRoute
 */
import Router from "koa-router";
import sysDeptCtl from "@root/controller/system/DeptController";
const router = new Router();
router.prefix("/api/system/dept");

//部门创建
router.post("/create", sysDeptCtl.Create);

//部门修改
router.put("/update", sysDeptCtl.Update);

//部门列表tree结构
router.get("/tree", sysDeptCtl.GetTree);

//部门删除
router.delete("/delete/:ids", sysDeptCtl.BatchDel);

export default router;
