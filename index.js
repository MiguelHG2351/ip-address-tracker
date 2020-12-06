const form = document.getElementById('form')
const btn = document.getElementById('btn')

form.addEventListener('submit', event => {
    event.preventDefault()
    console.log('This is a Log')
    console.log(this)
})

btn.addEventListener('click', function () {
    
})