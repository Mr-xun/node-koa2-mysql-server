/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-10 16:31:26
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-17 15:57:42
 * @Description: SystemUserController
 */
import verify from "@root/utils/verifyToken";
import config from "@root/config";
import utils from "@root/utils";
import validate from "@root/utils/validate";
import response from "@root/utils/response";
import paginate from "@root/utils/paginate";
import SystemUserService from "@root/service/system/UserService";
import LogLoginService from "@root/service/log/LogLoginService";
import UAParser from "ua-parser-js";
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
        //记录登录日志
        console.log(ctx.request, "ctx.request");
        const ua = ctx.request.header["user-agent"];
        var uaParser = new UAParser(ua).getResult();
        console.log(uaParser, "uaParser");
        await LogLoginService.Create({
            userId: userInfo.userId,
            userName: userInfo.userName,
            realName: userInfo.realName,
            lastLoginTime: userInfo.lastLoginTime,
            ua: uaParser.ua,
            browser: uaParser.browser.name + uaParser.browser.version,
            os: uaParser.os.name + uaParser.os.version,
            status: 1,
            msg: "登陆成功",
        });
        //更新上次登录时间
        await SystemUserService.Update({
            userId: userInfo.userId,
            lastLoginTime: new Date().getTime(),
        });
        const token = await verify.setToken(userInfo);
        response.success(ctx, {
            token,
        });
    } else {
        return response.fail(ctx, "登录失败,用户名或密码错误");
    }
};

const GetUserInfo = async (ctx) => {
    try {
        const token = ctx.header[config.jwt.header].replace("Bearer ", "");
        const tokenInfo = await verify.getToken(token);
        let { dataValues } = await SystemUserService.GetUserById(tokenInfo.userId);
        let userInfo = dataValues;
        userInfo.roleId = userInfo.system_roles.map((m) => m.dataValues.id).join(",");
        userInfo.roleName = userInfo.system_roles.map((m) => m.dataValues.roleName).join(",");
        userInfo.authorities = []; //菜单权限
        userInfo.system_roles.forEach((item) => {
            userInfo.authorities = userInfo.authorities.concat(item.dataValues.system_menus.filter((m) => !!m.dataValues.perms).map((m) => m.dataValues.perms));
        });
        userInfo.authorities = [...new Set(userInfo.authorities)];
        delete userInfo.system_roles;
        response.success(ctx, {
            ...userInfo,
        });
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

//获取用户权限菜单
const GetUserMenu = async (ctx) => {
    try {
        const token = ctx.header[config.jwt.header].replace("Bearer ", "");
        const tokenInfo = await verify.getToken(token);
        let { dataValues } = await SystemUserService.GetUserById(tokenInfo.userId);
        let permissions = []; //权限码
        let routes = []; //菜单路由
        dataValues.system_roles.forEach((item) => {
            permissions = permissions.concat(item.dataValues.system_menus.filter((m) => !!m.dataValues.perms).map((m) => m.dataValues.perms));
            routes = routes.concat(item.dataValues.system_menus);
        });
        //角色权限码去重
        permissions = [...new Set(permissions)];
        //角色菜单去重
        let map = new Map();
        for (let item of routes) {
            if (!map.has(item.menuId) && item.type == 1) {
                map.set(item.menuId, item);
            }
        }
        routes = [...map.values()];
        //菜单路由转树结构
        const arrayToTree = (array, parentId) => {
            let result = [];
            array.forEach((item) => {
                if (item.dataValues.parentId == parentId) {
                    item.dataValues.children = arrayToTree(array, item.dataValues.menuId);
                    //orderNum 排序
                    item.dataValues.children.sort((a, b) => a.orderNum - b.orderNum);
                    item.dataValues.alwaysShow = true;
                    item.dataValues.hidden = false;
                    item.dataValues.name = item.dataValues.menuName;
                    item.dataValues.meta = {
                        breadcrumb: true,
                        icon: item.dataValues.icon,
                        title: item.dataValues.menuName,
                    };
                    delete item.dataValues.menuId;
                    delete item.dataValues.menuName;
                    delete item.dataValues.parentId;
                    delete item.dataValues.icon;
                    delete item.dataValues.orderNum;
                    delete item.dataValues.type;
                    result.push(item);
                }
            });
            result.sort((a, b) => a.orderNum - b.orderNum);
            return result;
        };
        routes = arrayToTree(routes, 0);
        response.success(ctx, {
            permissions: permissions,
            routes: routes,
        });
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
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

//用户列表
const GetListByPage = async (ctx) => {
    try {
        let { userName = "", realName = "" } = ctx.query;
        let { limit, offset } = utils.setPager(ctx.query.pageNum, ctx.query.pageSize);
        let condition = {
            where: { userName, realName },
            limit,
            offset,
        };
        const { rows, count } = await SystemUserService.GetListByPage(condition);
        let list = rows.map((row) => row.dataValues);
        list.forEach((item) => {
            item.roleIds = item.system_roles.map((m) => m.dataValues.id);
            item.roleNames = item.system_roles.map((m) => m.dataValues.roleName);
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
    GetUserInfo,
    GetUserMenu,
    GetAll,
    GetListByPage,
};
