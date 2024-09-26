
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



// Hero Image and Text Adjustment
document.addEventListener('DOMContentLoaded', function () {
    function adjustHeroElements() {
        const heroImage = document.querySelector('.hero-image');
        const heroTextOverlay = document.querySelector('.card-img-overlay'); // Targeting the overlay containing text

        if (window.innerWidth < 576) {
            heroImage.style.marginLeft = '12.1px'; 
            heroTextOverlay.style.marginLeft = '12.1px'; 

        } else if (window.innerWidth < 992) {
            heroImage.style.marginLeft = '12.1px';
            heroTextOverlay.style.marginLeft = '12.1px';

        } else {
            heroImage.style.marginLeft = '0'; // Reset margin for larger screens
            heroTextOverlay.style.marginLeft = '0'; // Reset text overlay margin for larger screens
        }

        // Set overlay background width to match the hero image
        heroTextOverlay.style.width = `${heroImage.clientWidth}px`; // Adjust overlay width to match image width
        heroTextOverlay.style.background = 'rgba(0, 0, 0, 0.4)'; // Ensure background is set
    }

    // Adjust on load
    adjustHeroElements();

    // Adjust on window resize
    window.addEventListener('resize', adjustHeroElements);
});



// Members
document.addEventListener('DOMContentLoaded', async function() {
    // Function to fetch the JSON data
    async function fetchBusinesses() {
        try {
            const response = await fetch('./data/members.json'); // Adjust path if needed
            const businesses = await response.json();
            return businesses;
        } catch (error) {
            console.error('Error fetching JSON:', error);
            return [];
        }
    }

    // Function to display the membership cards
    function displayMembershipCards(businesses) {
        const cardContainer = document.getElementById('membership-cards');

        businesses.forEach(business => {
            const card = document.createElement('div');
            card.classList.add('business-card');

            // Create the card content dynamically
            card.innerHTML = `
                <h2 class="business-name">${business.name}</h2>
                <p class="business-tagline">${business.other_info.industry}</p>
                <hr>
                <div class="card-content">
                    <img src="${business.image}" alt="${business.name}" class="business-logo">
                    <div class="business-info">
                        <div><strong>Email:</strong> ${business.email}</div>
                        <div><strong>Phone:</strong> ${business.phone}</div>
                        <div><strong>URL:</strong> <a href="${business.website}" target="_blank">${business.website}</a></div>
                    </div>
                </div>
            `;

            // Append the card to the container
            cardContainer.appendChild(card);
        });
    }

    // Fetch and display the data
    const businesses = await fetchBusinesses();
    displayMembershipCards(businesses);
});
