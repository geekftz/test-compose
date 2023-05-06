function Koa() {
  // ...
  this.middlewares = [];
}

Koa.prototype.use = function (middleware) {
  // 此时 middleware 其实就是 (ctx, next) => ()
  this.middlewares.push(middleware); // 发布订阅，先收集中间件
  return this;
};

Koa.prototype.listen = function () {
  const fn = compose(this.middlewares); // 组合中间件
};

// 核心函数
function compose(middlewares) {
  // 准备递归
  function dispatch(i) {
    const middleware = middlewares[i]; // 别忘记中间件的格式 (ctx, next) => ()
    return middleware("ctx", dispatch.bind(null, i + 1)); // 每次调用next，都用调用一次dispatch方法，并且i+1
  }
  return dispatch(0);
}

const app = new Koa();

// 中间件1
app.use((ctx, next) => {
  console.log("1");
  next();
  console.log("2");
});

// 中间件2
app.use((ctx, next) => {
  console.log("3");
  console.log("4");
});

app.listen();
// 打印 1342
