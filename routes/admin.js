const router = require("koa-router")();
const adminCtl = require("../controller/AdminController");
router.prefix("/admin");

router.get("/", function (ctx, next) {
    ctx.body = "this is a user response!";
});

router.get("/findOne", adminCtl.findOne);
module.exports = router;
