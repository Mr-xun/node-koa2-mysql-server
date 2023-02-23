/*
 * @Author: xunxiao
 * @Date: 2023-02-22 10:30:30
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-23 10:30:58
 * @Description: BasicEnumTypeRoute
 */
import Router from "koa-router";
import BasicEnumTypeCtl from "@root/controller/basic/EnumTypeController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/basic/enumType");

//枚举类型创建
router.post("/create", ApiAuthMiddleware("enumType:create"), BasicEnumTypeCtl.EnumTypeCreate);

//枚举类型修改
router.put("/update", ApiAuthMiddleware("enumType:update"), BasicEnumTypeCtl.EnumTypeUpdate);

//枚举类型列表
router.get("/list", ApiAuthMiddleware("enumType:view"), BasicEnumTypeCtl.EnumTypeListByPage);

//所用枚举类型
router.get("/all", BasicEnumTypeCtl.EnumTypeGetAll);

//所用枚举类型字典
router.get("/allDict", BasicEnumTypeCtl.EnumTypeAllDict);

//枚举类型删除
router.delete("/delete/:ids", ApiAuthMiddleware("enumType:delete"), BasicEnumTypeCtl.EnumTypeBatchDelete);

export default router;
