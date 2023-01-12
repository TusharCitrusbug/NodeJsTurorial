const EventEmitter = require('events')
const event = new EventEmitter();

exports.logged_in_event = event.on('loggedIn', (s) => {
    console.log("logged in successfuilly",s);
})

exports.logged_out_event = event.on('loggedOut', (s) => {
    console.log("logged out successfuilly",s);
})