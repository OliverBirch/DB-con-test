const searchBar = document.querySelector('.search-bar')

searchBar.addEventListener('keyup', filternames)

/*function getRelevancy(value, searchString) {
    if (value === searchString) {
        return 2
    } else if (value.startsWith(searchString)) {
        return 1
    } else if (value.includes(searchString)) {
        return 0
    } else {
        return -1
    }
}*/

function filternames() {
    let filterValue = document.querySelector('.search-bar').value.toLowerCase().trim()
    let ul = document.querySelector('#student-list')
    let li = ul.querySelectorAll('li')
    
    // loops through all li and matches the value to the search bar value.
    if(filterValue.length > 0) {
        for (let i = 0; i < li.length; i++) {
            let a = li[i].querySelector('a')
            if(a.innerHTML.toLowerCase().indexOf(filterValue) > -1) {
                li[i].style.display = ''
            } else {
                li[i].style.display = 'none'
            }
        }
    } 
}