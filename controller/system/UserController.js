/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-10 16:31:26
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-17 10:57:26
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
const Create = async (ctx) => {
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
        const isExistUser = !!(await SystemUserService.GetOne({ userName: data.userName }));
        if (isExistUser) {
            return response.fail(ctx, "该用户已存在");
        }
        //默认密码为123456
        data.password = utils.MD5("123456");
        const { error } = await SystemUserService.Create(data);
        if (error) {
            return response.fail(ctx, "创建失败");
        }
        return response.success(ctx, null, "创建成功");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//用户修改
const Update = async (ctx) => {
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
        const { error } = await SystemUserService.Update(data);
        if (error) {
            return response.fail(ctx, error);
        }
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
//用户批量删除
const BatchDel = async (ctx) => {
    const { ids } = ctx.params;
    if (!ids || ids == "undefined") {
        ctx.body = response.fail(ctx, "删除失败");
        return;
    }
    try {
        const deleteIds = ids.split(",");
        const { error } = await SystemUserService.BatchDel(deleteIds);
        if (error) {
            return response.fail(ctx, error);
        }
        return response.success(ctx);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//用户登录
const Login = async (ctx) => {
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
    let userInfo = await SystemUserService.GetOne({ userName: data.userName, password: data.password });
    if (userInfo) {
        let upData = {
            userId: userInfo.userId,
            lastLoginTime: new Date().getTime(),
        };
        //更新上次登录时间
        await SystemUserService.Update(upData);
        const token = await verify.setToken(userInfo);
        response.success(ctx, {
            token,
            userInfo,
        });
    } else {
        return response.fail(ctx, "登录失败,用户名或密码错误");
    }
};

//用户验证登录状态
const Verify = async (ctx) => {
    const token = ctx.header[config.jwt.header].replace("Bearer ", "");
    const tokenInfo = await verify.getToken(token);
    response.success(ctx, {
        token,
        tokenInfo,
    });
};

//用户列表
const GetListByPage = async (ctx) => {
    let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
    let condition = {
        limit,
        offset,
    };
    try {
        const { rows, count } = await SystemUserService.GetListByPage(condition);
        let list = rows.map((row) => row.dataValues);
        list.forEach((item) => {
            item.roleIds = item.system_roles.map((m) => m.dataValues.id);
            delete item.system_roles;
        });
        response.success(ctx, paginate(list, count, limit));
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//所有用户
const GetAll = async (ctx) => {
    try {
        const rows = await SystemUserService.getUserALl();
        response.success(ctx, rows);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
export default {
    Create,
    Update,
    BatchDel,
    Login,
    Verify,
    GetAll,
    GetListByPage,
};
