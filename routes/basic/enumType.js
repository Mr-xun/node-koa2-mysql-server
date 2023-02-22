/*
 * @Author: xunxiao
 * @Date: 2023-02-22 10:30:30
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-22 11:27:09
 * @Description: BasicEnumTypeRoute
 */
import Router from "koa-router";
import BasicEnumTypeCtl from "@root/controller/basic/EnumTypeController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/basic/enumType");

//枚举类型创建
router.post("/create", ApiAuthMiddleware("menu:create"), BasicEnumTypeCtl.EnumTypeCreate);

//枚举类型修改
router.put("/update", ApiAuthMiddleware("menu:update"), BasicEnumTypeCtl.EnumTypeUpdate);

//枚举类型列表
router.get("/list", ApiAuthMiddleware("role:view"), BasicEnumTypeCtl.EnumTypeListByPage);

//所用枚举类型
router.get("/all", BasicEnumTypeCtl.EnumTypeGetAll);

//枚举类型删除
router.delete("/delete/:ids", ApiAuthMiddleware("role:delete"), BasicEnumTypeCtl.EnumTypeBatchDelete);

export default router;
