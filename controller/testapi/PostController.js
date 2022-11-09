/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-10 16:31:26
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-09 13:28:34
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
import PostService from "@root/service/testapi/PostService";

//用户创建
const postCreate = async (ctx) => {
    try {
        console.log(ctx.request.body,'ctx.request.body')
        const raw = await PostService.postCreate(ctx.request.body);
       
        console.log(raw);
        if (raw) {
            return response.success(ctx, null, "创建成功");
        }
        return response.fail(ctx, "创建失败");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};

const GetAll = async (ctx)=>{
    try {
        const rows = await PostService.GetAll();
        response.success(ctx, rows);
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
}

export default {
    postCreate,
    GetAll
};
