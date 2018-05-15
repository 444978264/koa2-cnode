const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const staticSource = require('koa-static');
const Router = require('./router/router');

const logger = async(ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method}:${ctx.request.url}`);
    await next();
}
app.use(logger);
//统一处理接口返回 格式
app.use(async(ctx, next) => {
    await next();
    let { url, response } = ctx;
    if (url.startsWith('/api')) {
        ctx.body = {
            status: 0,
            msg: "success",
            result: {
                ...response.body
            }
        }
    }
})

// 静态资源
app.use(staticSource(require('path').join(__dirname, './static')))

app.use(bodyParser());

app.use(Router.routes());

app.listen(3000)