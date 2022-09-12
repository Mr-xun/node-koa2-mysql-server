/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-10 16:26:15
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-12 17:09:10
 * @Description: Token 认证
 */
import JWT from "jsonwebtoken";
const config = require("../config");
const verify = {
    //设置token
    setToken(info) {
        return new Promise((resolve, reject) => {
            let token = JWT.sign(info, config.jwt.signKey, {
                expiresIn: config.jwt.signTime,
            });
            resolve(token);
        });
    },
    //解析token信息
    getToken(token) {
        return new Promise((resolve, reject) => {
            if (!token.split("").length) {
                reject({
                    error: "the token is empty",
                });
            } else {
                let data = JWT.verify(token.replace("Bearer ", ""), config.jwt.signKey);
                resolve(data);
            }
        });
    },
};
export default verify;
