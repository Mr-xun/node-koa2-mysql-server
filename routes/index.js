/*
 * @Author: xunxiao
 * @Date: 2023-02-21 10:56:18
 * @LastEditors: xunxiao
 * @LastEditTime: 2023-02-21 14:36:19
 * @Description: routes entry
 */
import fs from "fs";
import path from "path";
import Router from "koa-router";
const router = new Router();

const getModuleRoutes = (filePath = "") => {
    const stat = fs.statSync(path.join(__dirname, filePath));
    let isDirectory = stat.isDirectory();
    if (isDirectory) {
        let childFiles = fs.readdirSync(path.join(__dirname, filePath));
        childFiles.forEach((childFile) => getModuleRoutes((filePath ? filePath + "/" : "") + childFile));
    } else {
        const fileName = filePath.substr(0, filePath.length - 3);
        if (fileName !== "index") {
            const fileEntity = require(path.join(__dirname, filePath))?.default;
            router.use(fileEntity.routes());
        }
    }
};
getModuleRoutes();
export default router;
