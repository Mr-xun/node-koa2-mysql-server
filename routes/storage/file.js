import Router from "koa-router";
import StorageFileCtl from "@root/controller/storage/FileController";
import ApiAuthMiddleware from "@root/middlewares/ApiAuthMiddleware";

const router = new Router();
router.prefix("/api/storage/file");

//存储文件上传
router.post("/upload", StorageFileCtl.FileUpload);

export default router;
