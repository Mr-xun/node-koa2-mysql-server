/*
 * @Author: xunxiao
 * @Date: 2022-08-28 15:18:56
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-13 17:00:08
 * @Description: IndexRoute
 */
import Router from "koa-router";
const router = new Router();

router.get("/", async (ctx, next) => {
    await ctx.render("index", {
        title: "Hello Koa 2!",
    });
});

router.get("/string", async (ctx, next) => {
    ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
    ctx.body = {
        title: "koa2 json",
    };
});

export default router;
