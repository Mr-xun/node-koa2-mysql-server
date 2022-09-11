/*
 * @Author: xunxiao 17810204418@163.com
 * @Date: 2022-09-11 16:06:09
 * @LastEditors: xunxiao 17810204418@163.com
 * @LastEditTime: 2022-09-11 17:03:08
 * @Description: common paginate
 */
/**
 * @description: 分页返回
 * @param {*} rows
 * @param {*} total
 * @param {*} limit
 * @return {Object} {rows, total, pages}
 */
const paginate = (rows, total, limit) => {
    return {
        rows,
        total,
        pages: Math.ceil(total / limit),
    };
};
module.exports = paginate;
