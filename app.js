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

// 静态资源
// app.use(staticSource(require('path').join(__dirname, './static')))

// app.use(bodyParser());

// app.use(Router.routes());

app.use(async(ctx, next) => {
    let url = ctx.url;
    console.log(url)
    let request = ctx.request;
    let query = request.query;
    let query_string = request.querystring;

    let ctx_query = ctx.request;
    let ctx_querystring = ctx.querystring;

    ctx.body = {
        url,
        request,
        query,
        query_string,
        ctx_query,
        ctx_querystring
    }

})

app.listen(3000)