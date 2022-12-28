const socket = io("http://localhost:8000")

const chat_form = document.getElementById('send-container');
const call_form = document.getElementById('caller-container');

const messageInput = document.getElementById('messageInp');
const callerInput = document.getElementById('caller_id');

const messageContainer = document.querySelector('.container');

const clear_text_area = () => {
    let text_area = $('.emojionearea-editor')[0];
    text_area.innerText = '';
}

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}
let user_name = prompt("enter your name to join the chat-room");
socket.emit('new-user-joined', user_name)

socket.on('user-joined', (data) => {
    append(`${data} joined the chat`, 'left')
})



chat_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right")

    socket.emit('send-message', message)
    clear_text_area();
    messageInput.value = ''
})

socket.on('receive-message', (data) => {
    append(`${data.message}: ${data.name}`, 'left')
})


socket.on('left', (data) => {
    if (data !==null) {
        append(`${data} left the chat`, 'left')
    }
})


call_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const caller_id = callerInput.value;
    socket.emit('create_call', {to:caller_id,from:user_name})
    callerInput.value = ''
})


socket.on('receive_call', (data) => {
    console.log(data);
    let span = document.createElement('span')
    span.innerHTML = `${data.from} is Calling...................`
    call_form.append(span)
})