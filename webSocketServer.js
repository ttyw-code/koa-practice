const sockjs = require('sockjs')

const sockjsServer = sockjs.createServer({
    prefix: '/sockjs', // 客户端连接的路径前缀
    log: (severity, message) => console.log(message), // 可选日志
});

// 2. 监听 SockJS 连接事件
const connections = new Set(); // 存储所有连接

sockjsServer.on('connection', (conn) => {
    connections.add(conn);
    console.log('新的 SockJS 连接建立, ID:', conn.id);
    setInterval(() => {
        conn.write("this message from server.");

        conn.write(JSON.stringify({
            event: 'THE',
            data: "THE message."
        }));
    }, 10000)

    // 接收客户端消息
    conn.on('data', (message) => {
        console.log('收到客户端消息:', message);
        // 广播给所有客户端
        connections.forEach((client) => {

            if (client.readyState === sockjs.OPEN) {
                client.write(`服务器回应: ${message}`);
            }
        });
    });

    // 连接关闭
    conn.on('close', () => {
        connections.delete(conn);
        console.log('连接关闭, ID:', conn.id);
    });


});


module.exports = sockjsServer