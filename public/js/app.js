console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const latitude_search = document.querySelector('#latitude')
const longitude_search = document.querySelector('#longitude')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const latitude = latitude_search.value
    const longitude = longitude_search.value


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?latitude=${latitude}&longitude=${longitude}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})