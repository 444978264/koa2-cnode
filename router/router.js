const Router = require('koa-router')();
const fs = require('fs');
const busboy = require('koa-busboy');


const uploader = busboy({
    dest: './upload', // default is system temp folder (`os.tmpdir()`)
    fnDestFilename: (fieldname, filename) => {
        console.log(fieldname, filename)
        return filename
    }
})

function render(page) {
    return new Promise((resolve, reject) => {
        let url = `./views/${page}`;
        fs.readFile(url, (err, data) => {
            if (err) {
                return reject(err.stack)
            }
            resolve(data.toString());
        })
    })
}

Router.get('/', async(ctx, next) => {
    ctx.response.body = await render('index.html')
    await next()
})

Router.get('/user', async(ctx, next) => {
    ctx.response.body = await render('user.html')
    await next()
})

Router.get('/error', async(ctx, next) => {
    ctx.response.body = await render('error.html')
    await next()
})
Router.get('/upload', async(ctx, next) => {
    ctx.response.body = await render('upload.html')
    await next()
})


Router.post('/api/register', async(ctx, next) => {
    ctx.response.body = ctx.request.body
    await next()
})
Router.post('/api/upload', uploader, async(ctx, next) => {
    ctx.response.body = {
        status: 0,
        msg: '上传成功'
    }
    await next()
})

module.exports = Router