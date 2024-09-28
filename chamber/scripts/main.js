
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



// LOGO ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    function addLogoAndCompanyName() {
        const logoData = {
            src: 'images/logo.webp',  
            alt: 'Logo',
            class: 'navbar-brand-img',
            width: 225, 
            height: 225 
        };

        const companyNameData = {
            nameTop: 'Lagos',
            nameBottom: 'Chamber of Commerce'
        };

        // Create the image element for the logo
        const image = document.createElement('img');
        image.src = logoData.src;
        image.alt = logoData.alt;
        image.className = logoData.class;

        // Find the logo container and inject the logo
        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.innerHTML = ''; 
            logoContainer.appendChild(image); 
        }

        // Create company name elements
        const companyNameContainer = document.createElement('div');
        companyNameContainer.classList.add('company-name', 'ms-2');
        
        const nameTop = document.createElement('span');
        nameTop.classList.add('company-name-top');
        nameTop.textContent = companyNameData.nameTop;

        const nameBottom = document.createElement('span');
        nameBottom.classList.add('company-name-bottom');
        nameBottom.textContent = companyNameData.nameBottom;

        // Append nameTop and nameBottom to the container
        companyNameContainer.appendChild(nameTop);
        companyNameContainer.appendChild(document.createElement('br')); // Line break between top and bottom name
        companyNameContainer.appendChild(nameBottom);

        // Inject the company name next to the logo
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.appendChild(companyNameContainer);
        }
    }

    addLogoAndCompanyName(); // Call the function when DOM content is loaded
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
