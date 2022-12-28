const xmpp_server_1 = require('simple-xmpp');

const sender1 = () => {
    setTimeout(sender1, 5000);
    xmpp_server_1.send('root@localhost', "root-----------")
}

// server-1
xmpp_server_1.connect({
    "jid": "admin@localhost",
    "password": "passw0rd",
    "host": "localhost",
    "port": 5222
})

xmpp_server_1.on('online', data => {
    console.log('heyyyyyyyy you are online', data);
    sender1();
})

xmpp_server_1.on('error', error => {
    console.log('error', error);
})


xmpp_server_1.on('chat', (from, message) => {
    console.log(`message ${message}`, from);
})
