/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-04 15:28:48
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-09 13:26:49
 * @Description: UserRoute
 */
import Router from "koa-router";
import postCtl from "@root/controller/testapi/PostController";
const router = new Router();
router.prefix("/api/testapi/post");

//用户创建
router.post("/create", postCtl.postCreate);

//所用用户
router.get("/all", postCtl.GetAll);

export default router;
