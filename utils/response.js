/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-10 17:55:15
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-11 15:56:07
 * @Description: 统一返回
 */
//返回值
const CODE = {
    SUCCESS: 200, //成功返回
    FAIL: -1, //普通错误
    SYSTEM_ERROR: 500, //系统错误
    AUTH_ERROR: 401, //权限错误
};
module.exports = {
    success(ctx, data = null, msg = "success", code = CODE.SUCCESS) {
        ctx.body = {
            code,
            msg,
            data: data ? { ...data } : null,
        };
    },
    fail(ctx, msg = "fail", code = CODE.FAIL, data = null) {
        ctx.body = {
            code,
            msg,
            data,
        };
    },
    error(ctx, msg = "系统异常", error = "", code = CODE.SYSTEM_ERROR, data = null) {
        ctx.body = {
            code,
            msg,
            error,
            data,
        };
    },
    CODE,
};
