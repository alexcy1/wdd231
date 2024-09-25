
// Theme toggle functionality ------------------------------------------------------------------------
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.body.classList.add(currentTheme);
}

themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    // Save the theme to localStorage
    let theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
});

// Toggle Navbar Toggler
const navbarToggler = document.querySelector('.navbar-toggler');
navbarToggler.addEventListener('click', function () {
    navbarToggler.classList.toggle('open');
});



// LOGO ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    function addLogoImage() {
        const logoData = {
            src: 'images/logo.png',  
            alt: 'Logo',
            class: 'navbar-brand-img'
        };

        // Create the image element
        const image = document.createElement('img');
        image.src = logoData.src;
        image.alt = logoData.alt;
        image.className = logoData.class;

        // Find the navbar brand element
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.innerHTML = ''; 
            navbarBrand.appendChild(image); 
        }
    }

    addLogoImage();
});



// Toggle Menu
document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.querySelector(".navbar-toggler");
    const navCollapse = document.querySelector("#navbarNav");

    // Add event listener for toggler button click
    toggler.addEventListener("click", function() {
        // Toggle 'open' class on the button when clicked
        toggler.classList.toggle("open");
    });

    // Listen to the Bootstrap collapse show event
    navCollapse.addEventListener('shown.bs.collapse', function() {
        toggler.classList.add('open'); // Add 'open' class when the menu is open
    });

    // Listen to the Bootstrap collapse hide event
    navCollapse.addEventListener('hidden.bs.collapse', function() {
        toggler.classList.remove('open'); // Remove 'open' class when the menu is closed
    });
});



// Footer
document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});


