/*
 * @Author: xunxiao
 * @Date: 2023-02-27 17:29:50
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-27 18:22:41
 * @Description: UploadController
 */
import utils from "@root/utils";
import fs from "fs";
import path from "path";
import response from "@root/utils/response";
import dayjs from "dayjs";
/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
function checkDirExist(p) {
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p, { recursive: true }); // 递归创建子文件夹
    }
}

/**
 * @description 抽离公共方法 校验单文件类型
 */
const validateFileType = (file) => {
    // @ts-ignore
    // console.log(file.originalFilename, file.filepath, file.mimetype)
    // @ts-ignore
    const fileType = file.mimetype;
    const typeSet = new Set([
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/bmp",
        "video/mp4",
        "video/webm",
        "video/x-msvideo",
        "audio/mpeg",
        "audio/ogg",
        "text/markdown",
        "application/json",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.ms-powerpoint",
        "application/pdf",
        "application/zip",
        "application/x-zip-compressed",
    ]);
    if (!typeSet.has(fileType)) {
        return false;
    }
    return true;
};

/**
 * @description 抽离公共方法 存储单文件
 */
function saveFileThis(file) {
    // @ts-ignore
    const reader = fs.createReadStream(file.filepath); // 创建可读流
    // @ts-ignore
    const ext = path.extname(file.originalFilename);
    // 最终要保存到的文件夹目录
    const yyyyMMdd = dayjs().format("YYYYMMDD"); // 目录： 年月日
    const lastDir = path.join(__dirname, "../..", `static/upload/${yyyyMMdd}`);
    checkDirExist(lastDir); // 检查文件夹是否存在如果不存在则新建文件夹
    //生成随机数
    var ran = parseInt(Math.random() * 8999 + 10000);
    const filePath = `/upload/${yyyyMMdd}/` + ran + ext;
    const writer = fs.createWriteStream("static" + filePath); // 创建可写流
    reader.pipe(writer); // 可读流通过管道写入可写流

    return filePath;
}
//文件上传
const FileUpload = async (ctx) => {
    const maxFileSize = 100 * 1024 * 1024; // 单文件最大值
    try {
        const files = ctx.request.files?.file; // 获取上传文件
        if (!files) {
            return response.fail(ctx, "文件不能为空");
        }
        let filePathArr = [];
        if (!Array.isArray(files)) {
            // 是否是数组
            if (!validateFileType(files)) {
                return response.error(ctx, "", "非法文件上传");
            }
            if (files.size > maxFileSize) {
                return response.error(ctx, "", `文件大小超过${maxFileSize / 1024 / 1024}M`);
            }
            const filePath = saveFileThis(files);
            filePathArr.push(filePath);
        } else {
            let errArr = [];
            for (let file of files) {
                if (!validateFileType(file)) {
                    errArr.push("非法文件上传");
                    continue;
                }
                if (file.size > maxFileSize) {
                    errArr.push(`文件大小超过${maxFileSize / 1024 / 1024}M`);
                    continue;
                }
            }
            if (errArr.length > 0) {
                return response.error(ctx, errArr);
            }
            for (let file of files) {
                const filePath = saveFileThis(file);
                filePathArr.push(filePath);
            }
        }
        return response.success(ctx, null, "上传成功");
    } catch (error) {
        console.log(error);
        return response.error(ctx, "系统异常");
    }
};
export default {
    FileUpload,
};
