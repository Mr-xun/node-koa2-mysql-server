/*
 * @Author: xunxiao
 * @Date: 2022-09-14 09:14:52
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-09-15 08:56:01
 * @Description: 表单验证
 */
import Schema from "async-validator";

/**
 * @description: 表单校验
 * @param {object} data 校验数据
 * @param {import("async-validator").Rules} rules 校验规则
 * @param {boolean} flag 是否返回完整的的错误信息
 */
const validate = async (data = {}, rules, flag = false) => {
    const validator = new Schema(rules);
    return await validator
        .validate(data)
        .then((data) => {
            return {
                data,
                error: null,
            };
        })
        .catch((err) => {
            if (flag) {
                return {
                    data: null,
                    error: err.errors,
                };
            }
            return {
                data: null,
                error: err.errors[0].message,
            };
        });
};
export default validate;
