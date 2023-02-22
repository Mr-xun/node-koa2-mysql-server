/*
 * @Author: xunxiao
 * @Date: 2023-02-22 13:57:07
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 14:01:07
 * @Description: BasicEnumRoute
 */

import Router from "koa-router";
import BasicEnumCtl from "@root/controller/basic/EnumController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/basic/enum");

//枚举字典创建
router.post("/create", ApiAuthMiddleware("menu:create"), BasicEnumCtl.EnumCreate);

//枚举字典修改
router.put("/update", ApiAuthMiddleware("menu:update"), BasicEnumCtl.EnumUpdate);

//枚举字典列表
router.get("/list", ApiAuthMiddleware("role:view"), BasicEnumCtl.EnumListByPage);

//所用枚举字典
router.get("/all", BasicEnumCtl.EnumGetAll);

//枚举字典删除
router.delete("/delete/:ids", ApiAuthMiddleware("role:delete"), BasicEnumCtl.EnumBatchDelete);

export default router;
