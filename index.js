// 洋葱模型
// index.js
const Koa = require("koa");
const app = new Koa();

// 中间件1
app.use(async (ctx, next) => {
  console.log("1");
  await next();
  console.log("2");
});
// 中间件2
app.use(async (ctx, next) => {
  console.log("3");
  await next();
  console.log("4");
});
// 中间件3
app.use(async (ctx, next) => {
  console.log("5");
  await next();
  console.log("6");
});

app.listen(8002);
