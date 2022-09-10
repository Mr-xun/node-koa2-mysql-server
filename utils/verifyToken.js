const JWT = require("jsonwebtoken");
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
                    error: "the token is impty",
                });
            } else {
                let data = JWT.verify(token.replace("Bearer ", ""), config.jwt.signKey);
                resolve(data);
            }
        });
    },
};

module.exports = verify;
