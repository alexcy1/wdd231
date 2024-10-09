// Toggle Menu without Bootstrap
document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.querySelector(".navbar-toggler");
    const navCollapse = document.querySelector("#navbarNav");

    // Add event listener for toggler button click
    toggler.addEventListener("click", function() {
        // Toggle 'open' class on the button when clicked (for hamburger icon animation)
        toggler.classList.toggle("open");

        // Toggle 'show' class on the navbar menu to show/hide it
        navCollapse.classList.toggle("show");
    });
});




// LOGO ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    function addLogoAndCompanyName() {
        const logoData = {
            src: 'images/logo.png',  
            alt: 'Logo',
            class: 'navbar-brand-img',
            width: 225, 
            height: 225 
        };

        const companyNameData = {
            nameTop: 'rruki',
        };

        // Create the image element for the logo
        const image = document.createElement('img');
        image.src = logoData.src;
        image.alt = logoData.alt;
        image.className = logoData.class;
        image.width = logoData.width; // Set width
        image.height = logoData.height; // Set height

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

        // Append nameTop and nameBottom to the container
        companyNameContainer.appendChild(nameTop);

        // Inject the company name next to the logo
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.appendChild(companyNameContainer);
        }
    }

    addLogoAndCompanyName(); // Call the function when DOM content is loaded
});




// Footer =============================================================================
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




// NEWS LETTER =============================================================================

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    const emailInput = document.getElementById('email');
    const email = emailInput.value; // Get the submitted email
    
    // Display success message in the modal
    const successMessage = `Congratulations! You've successfully subscribed with the email: ${email}`;
    document.getElementById('successMessage').textContent = successMessage;
    
    // Show the modal
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Close the modal when the "x" is clicked
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };
    
    // Close the modal when clicking outside the modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    
    // Clear the form input after submission
    emailInput.value = '';
});