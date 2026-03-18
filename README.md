# Koa Production-style Demo

## 目录
- [启动](#启动)
- [结构](#结构)
- [API](#api)

## 启动
1. 复制 `.env.example` 为 `.env` 并配置
2. 安装依赖： `npm install`
3. 本地开发： `npm run dev`
4. 生产启动： `npm start`

默认服务: `http://localhost:5000`

## 目录
- `src/app.js` - Koa 中间件与路由
- `src/server.js` - 启动 HTTP + WebSocket
- `src/routes` - 路由层
- `src/controllers` - 业务层
- `src/models` - Mongoose 模型
- `src/db` - 数据库连接
- `src/webSocket` - SockJS 服务器

## API
- `GET /` - 健康检查
- `GET /users` - 查询用户
- `GET /users/:id` - 查询单个用户
- `POST /users` - 创建用户

