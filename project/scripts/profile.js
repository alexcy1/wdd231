// On page load, retrieve and display the user data
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
        // Display user details
        document.querySelector('.username').textContent = userData.username;
        document.querySelector('.email').textContent = userData.email;
        document.getElementById('first-name-display').textContent = userData.firstName;
        document.getElementById('last-name-display').textContent = userData.lastName;
        document.getElementById('phone-display').textContent = userData.phone;
        document.getElementById('profession-display').textContent = userData.profession;
        document.getElementById('company-display').textContent = userData.company;
        document.getElementById('about-me-display').textContent = userData.aboutMe;

        // Lazy load the profile image (base64)
        const profileImg = document.querySelector('.profile-image');
        if (userData.profileImage) {
            profileImg.setAttribute('src', userData.profileImage);
            profileImg.setAttribute('loading', 'lazy');
        }
    }
});

