const xmpp_server_2 = require('simple-xmpp');
const sender2 = () => {
    setTimeout(sender2, 5000);
    xmpp_server_2.send('admin@localhost', "tushar-----------")
}

// server-2
xmpp_server_2.connect({
    "jid": "root@localhost",
    "password": "passw0rd",
    "host": "localhost",
    "port": 5222
})

xmpp_server_2.on('online', data => {
    console.log('heyyyyyyyy you are online', data);
    sender2();
})

xmpp_server_2.on('error', error => {
    console.log('error', error);
})


xmpp_server_2.on('chat', (from, message) => {
    console.log(`message ${message}`, from);
})

