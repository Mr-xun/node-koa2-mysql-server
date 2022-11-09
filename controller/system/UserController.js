/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-10 16:31:26
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-09 15:34:04
 * @Description: SystemUserController
 */
import verify from "@root/utils/verifyToken";
import config from "@root/config";
import utils from "@root/utils";
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import paginate from "@root/utils/paginate";
import SystemUserService from "@root/service/system/UserService";
import SystemRoleService from "@root/service/system/RoleService";

//用户创建
const userCreate = async (ctx) => {
    const rules = {
        userName: [{ type: "string", required: true, message: "用户名不能为空" }],
        realName: [{ type: "string", required: true, message: "姓名不能为空" }],
    };
    const fromData = ctx.request.body;
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const isExistUser = !!(await SystemUserService.getUserOne({ userName: data.userName }));
        if (isExistUser) {
            return response.fail(ctx, "该用户已存在");
        }
        //默认密码为123456
        data.password = utils.MD5("123456");
        const newData = await SystemUserService.userCreate(data);
        const roles = await SystemRoleService.GetAll({
            where: {
                id: data.roleIds,
            },
        });
        await newData.setSystem_roles(roles); //通过setSystem_roles方法在system_user_roles表添加记录
        if (newData.userId) {
            return response.success(ctx, null, "创建成功");
        }
        return response.fail(ctx, "创建失败");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//用户修改
const userUpdate = async (ctx) => {
    const fromData = ctx.request.body;
    const rules = {
        userId: [{ type: "number", required: true, message: "用户Id不能为空" }],
        userName: [{ type: "string", required: true, message: "用户名不能为空" }],
    };
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    try {
        const isExistUser = !!(await SystemUserService.getUserOne({ userId: data.userId }));
        if (!isExistUser) {
            return response.fail(ctx, "该用户不存在");
        }
        //不可直接修改用户名和密码
        delete data.password;
        delete data.userName;
        const [upCount] = await SystemUserService.userUpdate(data);
        if (upCount) {
            return response.success(ctx);
        } else {
            return response.fail(ctx, "更新失败");
        }
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
//用户批量删除
const userBatchDel = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const delCount = await SystemUserService.userBatchDel(deleteIds);
        if (delCount) {
            return response.success(ctx);
        } else {
            return response.fail(ctx, "删除失败");
        }
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//用户登录
const userLogin = async (ctx) => {
    const rules = {
        userName: [{ type: "string", required: true, message: "用户名不能为空" }],
        password: [{ type: "string", required: true, message: "密码不能为空" }],
    };
    const fromData = ctx.request.body;
    const { data, error } = await validate(fromData, rules);
    if (error) {
        return response.fail(ctx, error);
    }
    data.password = utils.MD5(data.password);
    let userInfo = await SystemUserService.getUserOne({ userName: data.userName, password: data.password });
    if (userInfo) {
        let upData = {
            userId: userInfo.userId,
            lastLoginTime: new Date().getTime(),
        };
        //更新上次登录时间
        await SystemUserService.userUpdate(upData);
        const token = await verify.setToken(userInfo);
        response.success(ctx, {
            token,
            userInfo,
        });
    } else {
        return response.fail(ctx, "登录失败,用户名或密码错误");
    }
};

//用户登录成功
const userLoginSuccess = async (ctx) => {
    const token = ctx.header[config.jwt.header].replace("Bearer ", "");
    const tokenInfo = await verify.getToken(token);
    //更新上次登录时间
    let upData = {
        userId: tokenInfo.userId,
        lastLoginTime: new Date().getTime(),
    };
    try {
        let [upCount] = await SystemUserService.userUpdate(upData);
        if (upCount) {
            return response.success(ctx);
        } else {
            return response.fail(ctx, "更新失败");
        }
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//用户验证登录状态
const userVerify = async (ctx) => {
    const token = ctx.header[config.jwt.header].replace("Bearer ", "");
    const tokenInfo = await verify.getToken(token);
    response.success(ctx, {
        token,
        tokenInfo,
    });
};

//用户列表
const userList = async (ctx) => {
    let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
    let condition = {
        limit,
        offset,
    };
    try {
        const { rows, count } = await SystemUserService.getUserListByPage(condition);
        response.success(ctx, paginate(rows, count, limit));
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//所有用户
const userAll = async (ctx) => {
    try {
        const rows = await SystemUserService.getUserALl();
        response.success(ctx, rows);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
export default {
    userCreate,
    userUpdate,
    userBatchDel,
    userLogin,
    userLoginSuccess,
    userVerify,
    userAll,
    userList,
};
