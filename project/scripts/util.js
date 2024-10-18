
// Toggle Menu without Bootstrap
document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.querySelector(".navbar-toggler");
    const navCollapse = document.querySelector("#navbarNav");

    toggler.addEventListener("click", function() {
        toggler.classList.toggle("open");
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
            height: 225,
            url: 'index.html' 
        };

        const companyNameData = {
            nameTop: 'rruki',
            url: 'index.html' 
        };

        // Create the anchor element for the logo link
        const logoLink = document.createElement('a');
        logoLink.href = logoData.url; 

        // Create the image element for the logo
        const image = document.createElement('img');
        image.src = logoData.src;
        image.alt = logoData.alt;
        image.className = logoData.class;
        image.width = logoData.width; 
        image.height = logoData.height; 
        image.loading = 'lazy';

        // Append the image to the anchor
        logoLink.appendChild(image);

        // Find the logo container and inject the logo link
        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.innerHTML = ''; 
            logoContainer.appendChild(logoLink); 
        }

        // Create company name elements
        const companyNameContainer = document.createElement('div');
        companyNameContainer.classList.add('company-name', 'ms-2');
        
        // Create the anchor element for the company name link
        const companyNameLink = document.createElement('a');
        companyNameLink.href = companyNameData.url; 

        const nameTop = document.createElement('span');
        nameTop.classList.add('company-name-top');
        nameTop.textContent = companyNameData.nameTop;

        // Append nameTop to the company name link
        companyNameLink.appendChild(nameTop);

        // Append the link to the company name container
        companyNameContainer.appendChild(companyNameLink);

        // Inject the company name next to the logo
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.appendChild(companyNameContainer);
        }
    }

    addLogoAndCompanyName(); 
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




// NEWSLETTER =============================================================================

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    
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





// USERNAME, IMAGE AND DROP DOWN MENU ON NAVBAR ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const profileMenuImage = document.querySelector('.profile-menu-image');
    const userNameDisplay = document.querySelector('.user-name');
    const signInBtn = document.querySelector('.sign-in-btn');
    const userDropdown = document.querySelector('.user-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Select the correct links for profile, delete user, and update profile actions
    const profileLink = dropdownMenu.querySelectorAll('.dropdown-link')[0]; 
    const deleteUserLink = dropdownMenu.querySelectorAll('.dropdown-link')[1]; 
    const updateProfileLink = dropdownMenu.querySelectorAll('.dropdown-link')[2]; 

    // Function to update UI based on login status
    function updateUI() {
        const userData = JSON.parse(localStorage.getItem('user')); 
        console.log('User data:', userData); 

        if (userData) {
            // If the user is logged in, display their image and username
            userNameDisplay.textContent = userData.username || "User"; 
            if (userData.profileImage) {
                profileMenuImage.setAttribute('src', userData.profileImage);
            }

            // Show the user dropdown and hide the sign-in button
            userDropdown.style.display = 'block'; 
            signInBtn.style.display = 'none'; 
        } else {
            // If no user is logged in, hide the user dropdown and show the sign-in button
            userDropdown.style.display = 'none'; 
            signInBtn.style.display = 'block'; 
        }
    }

    // Initial UI update
    updateUI();

    // Add event listener to toggle dropdown visibility when the user clicks the profile image
    profileMenuImage.addEventListener('click', function (event) {
        event.preventDefault();
        dropdownMenu.classList.toggle('show'); 
        event.stopPropagation();
    });

    // Close the dropdown when clicking anywhere outside the dropdown menu
    document.addEventListener('click', function (event) {
        if (!dropdownMenu.contains(event.target) && !profileMenuImage.contains(event.target)) {
            dropdownMenu.classList.remove('show'); 
        }
    });

    // Profile link functionality - Redirect to profile page
    profileLink.addEventListener('click', function (event) {
        event.preventDefault(); 
        window.location.href = 'profile.html'; 
    });

    // Update profile link functionality - Redirect to update profile page
    updateProfileLink.addEventListener('click', function (event) {
        event.preventDefault(); 
        window.location.href = 'update-profile.html'; 
    });

    // Delete user functionality
    deleteUserLink.addEventListener('click', function (event) {
        event.preventDefault(); 

        // Remove user data from local storage
        localStorage.removeItem('user');

        // Update UI to reflect deletion
        updateUI(); 

        // Redirect to sign-up page
        window.location.href = 'signup.html';
    });
});





// CHECK FOR USER =================================================================
function checkUserSignedUp() {
    const userData = JSON.parse(localStorage.getItem('user')); // Retrieve user data from local storage

    // Check if user data exists
    if (userData) {
        // Check the current page
        const currentPage = window.location.pathname.split('/').pop(); // Get the current page name

        // Redirect if on signup or create profile pages
        if (currentPage === 'signup.html' || currentPage === 'create-profile.html') {
            window.location.href = 'profile.html'; 
        }
    }
}
// Call the function when the page loads
document.addEventListener('DOMContentLoaded', checkUserSignedUp);





