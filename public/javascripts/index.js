//Close flash messages when clicked
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        e.preventDefault()
        e.target.parentElement.parentElement.classList.add('remove-animation')
        setTimeout(function() {
            e.target.parentElement.parentElement.remove()
        }, 270)

    }
}, false)