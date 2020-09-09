const tabButton = document.querySelector('.tab')
const collapsibleSection = document.querySelector('.collapsible-card')

tabButton.addEventListener('click', (e) => {
    if (collapsibleSection.classList.contains('hidden')) {
        // folds out the manual section
        collapsibleSection.classList.remove('hidden')
        collapsibleSection.classList.add('visible')

        // flips the direction of the arrow in button
        tabButton.firstElementChild.innerHTML = 'arrow_upward'
    } else {
        collapsibleSection.classList.remove('visible')
        collapsibleSection.classList.add('hidden')
        tabButton.firstElementChild.innerHTML = 'arrow_downward'

    }
    
    e.preventDefault()
}, false)