/*
 * @Author: xunxiao
 * @Date: 2022-09-14 09:14:52
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-14 17:23:41
 * @Description: 表单验证
 */
import Schema from "async-validator";

/**
 * @description: 获取参数
 * @param {import("koa").Context} ctx 上下文
 * @param {*} type 取参类型 body | query
 * @return {*}
 */
const getFormData = (ctx, type = "body") => {
    switch (type) {
        case "body":
            return ctx.request.body;
        // case "query":
        //     console.log(ctx.query,ctx.query.name,444444444)
        //     return ctx.query;
    }
};
/**
 * @description: 表单校验
 * @param {import("koa").Context} ctx 上下文
 * @param {import("async-validator").Rules} rules 校验规则
 * @param boolean flag 是否返回完整的的错误信息
 * @return {*}
 */
const validate = async (ctx, rules, flag = false) => {
    const validator = new Schema(rules);
    let data = null;
    switch (ctx.method) {
        case "GET":
            // data = getFormData(ctx, "query");
            break;
        case "POST":
            data = getFormData(ctx, "body");
            break;
        case "PUT":
            data = getFormData(ctx, "body");
            break;
        case "DELETE":
            data = getFormData(ctx, "body");
            break;
    }
    return await validator
        .validate(data)
        .then((res) => {
            return {
                data: res,
                error: null,
            };
        })
        .catch((err) => {
            if (flag) {
                return {
                    data: null,
                    error: err.errors,
                };
            }
            return {
                data: null,
                error: err.errors[0].message,
            };
        });
};
export default validate;
