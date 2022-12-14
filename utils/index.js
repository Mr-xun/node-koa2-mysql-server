/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:50:15
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-15 09:42:21
 * @Description: common utils
 */
import md5 from "md5";
/**
 * @description 设置页码
 * @param {number} page 页码 默认为1
 * @param {number} limit 每页个数 默认为10
 * @returns {object} {
        page,
        limit,
        offset
    }
 */
const setPager = (page, limit) => {
    if (!page || isNaN(Number(page)) || page <= 0) {
        page = 1;
    } else {
        page = Number(page);
    }

    if (!limit || isNaN(Number(limit)) || limit <= 0) {
        limit = 10;
    } else {
        limit = Number(limit);
    }
    let offset = (page - 1) * limit;

    return {
        page,
        limit,
        offset,
    };
};
const MD5 = (val) => md5(val);
export default {
    setPager,
    MD5,
};
