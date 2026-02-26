const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const mongoose = require('mongoose');
const http = require('http');
const sockjsServer = require('./webSocketServer')


const app = new Koa();
const router = new Router();

mongoose.connect('mongodb://localhost:27017/koaDemo', {
})
    .then(() => { console.log('MongoDB connected successfully'); })
    .catch(err => { console.error('MongoDB connection error:', err); });


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});


// 创建模型
// 注意：mongoose.model() 的第一个参数是模型名，第二个参数是集合名
const User = mongoose.model('users', userSchema); // 'users' 是集合名

app.use(koaBody({
    json: true, // 解析 JSON
    form: true, // 解析表单
    multipart: true // 文件上传
}));

// 响应
app.use(router.routes()).use(router.allowedMethods());
router.get('/', async (ctx) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = 'Welcome to the Credit Letter Comparison API';
});

router.get('/users', async (ctx) => {
    try {
        const users = await User.find(); // 查询所有用户
        ctx.status = 200; // 设置状态码为 200 OK
        // ctx.header['access-control-allow-origin'] = '*';
        const res = {
            data: users,
            message: 'Users fetched successfully',
            code: 200
        }
        ctx.body = res;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to fetch users' };
    }
})
    .get('/users/:id', async (ctx) => {
        ctx.body = `User: ${ctx.params.id}`;
    })
    .post('/users', async (ctx) => {

        try {
            console.log(ctx.request.body);
            const { name, age, email } = ctx.request.body;
            const user = new User({ name, age, email });
            console.log("user:", user);
            await user.save();

            // ctx.header['access-control-allow-origin'] = '*';
            // ctx.header['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            // ctx.header['access-control-allow-headers'] = 'Content-Type, Authorization';
            // ctx.header['access-control-expose-headers'] = 'Content-Length, X-JSON';
            ctx.body = 'Create user successfully';
            ctx.status = 201; // 设置状态码为 201 Created

        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to create user' };
            return;

        }

    })
    .get("/json", (ctx) => {
        ctx.response.type = 'json';
        ctx.response.body = {
            'key': 'this is a json file.'
        };
    });
const httpServer = http.createServer(app.callback());
sockjsServer.installHandlers(httpServer);

httpServer.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
    console.log('ws Server is running on ws://localhost:5000/sockjs');
});