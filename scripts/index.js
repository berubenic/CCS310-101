// vanilla js
// on document load, get url and set is active on the nav item
document.addEventListener('DOMContentLoaded', function() {
    let url = window.location.pathname;
    // remove slash from the url
    url = url.substring(1);
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        if (item.getAttribute('href') === url || (item.getAttribute('href') === '/' && url === '')){
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    })
});

console.log('Hello from index.js');
