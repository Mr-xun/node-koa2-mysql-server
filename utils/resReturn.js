//返回值
const CODE = {
    SUCCESS: 200, //成功返回
    FAIL_ERROR: -1, //普通错误
    SYSTEM_ERROR: 500, //系统错误
    AUTH_ERROR: 401, //权限错误
};
module.exports = {
    success(code = CODE.SUCCESS, msg = "success", data = null) {
        return {
            code,
            msg,
            data: data ? { ...data } : null,
        };
    },
    fail(code = CODE.FAIL_ERROR, msg = "fail", data = null) {
        return {
            code,
            msg,
            data,
        };
    },
    error(code = CODE.SYSTEM_ERROR, msg = "系统异常", error = "", data = null) {
        return {
            code,
            msg,
            error,
            data,
        };
    },
    CODE,
};
