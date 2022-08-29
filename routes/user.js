const router = require('koa-router')()

router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a user/bar response'
})

module.exports = router
