//返回值
const CODE = {
    SUCCESS: 200, //成功返回
    PARPM_ERROR: -1, //普通错误
    SYSTEM_ERROR: 500, //系统错误
    AUTH_ERROR: 401, //权限错误
};
module.exports = {
    success(data = null, msg = "success", code = CODE.SUCCESS) {
        return {
            code,
            msg,
            data: data ? { ...data } : null,
        };
    },
    fail(msg = "fail", code = CODE.PARPM_ERROR, data = null) {
        return {
            code,
            msg,
            data,
        };
    },
    error(error = "", msg = "系统异常", code = CODE.SYSTEM_ERROR, data = null) {
        return {
            code,
            msg,
            error,
            data,
        };
    },
    CODE,
};
