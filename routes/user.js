const router = require("koa-router")();
const userCtl = require("../controller/UserController");

router.prefix("/user");

router.get("/", function (ctx, next) {
    ctx.body = "this is a user response!";
});

router.get("/bar", function (ctx, next) {
    ctx.body = "this is a user/bar response";
});
router.post("/login", userCtl.userLogin);
router.post("/verify", userCtl.userVerify);
module.exports = router;
