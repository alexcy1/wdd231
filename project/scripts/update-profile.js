
// document.addEventListener('DOMContentLoaded', function () {
//     // Retrieve user data from local storage
//     const userData = JSON.parse(localStorage.getItem('user'));

//     // Check if user data is available
//     console.log('User data retrieved for update:', userData); // Log retrieved data

//     // Populate the form with existing user data
//     if (userData) {
//         document.getElementById('first-name').value = userData.firstName || '';
//         document.getElementById('last-name').value = userData.lastName || '';
//         document.getElementById('phone').value = userData.phone || '';
//         document.getElementById('profession').value = userData.profession || '';
//         document.getElementById('company').value = userData.company || '';
//         document.getElementById('about-me').value = userData.aboutMe || '';

//         // Display existing profile image if available
//         if (userData.profileImage) {
//             document.getElementById('existing-profile-image').src = userData.profileImage;
//             document.getElementById('existing-profile-image').style.display = 'block'; // Show existing image
//         }
//     } else {
//         console.log('No user data found in local storage.');
//         window.location.href = 'signup.html'; // Redirect if no user data found
//     }

//     // Handle form submission for updating profile
//     document.getElementById('profile-form').addEventListener('submit', function (event) {
//         event.preventDefault();

//         // Get the updated user data from the form, but keep username and email if unchanged
//         const updatedUser = {
//             firstName: document.getElementById('first-name').value || userData.firstName,
//             lastName: document.getElementById('last-name').value || userData.lastName,
//             phone: document.getElementById('phone').value || userData.phone,
//             profession: document.getElementById('profession').value || userData.profession,
//             company: document.getElementById('company').value || userData.company,
//             aboutMe: document.getElementById('about-me').value || userData.aboutMe,
//             profileImage: userData.profileImage // Keep the existing image unless updated
//         };

//         const profileImageInput = document.getElementById('profile-image').files[0];
//         if (profileImageInput) {
//             // Convert new image to Base64 if provided
//             getBase64(profileImageInput, function (base64Image) {
//                 updatedUser.profileImage = base64Image;
//                 saveUpdatedProfile(updatedUser);
//             });
//         } else {
//             saveUpdatedProfile(updatedUser); // Save without updating the image
//         }
//     });

//     function saveUpdatedProfile(user) {
//         // Save the updated user data back to local storage
//         console.log('Saving updated user data:', user); // Log user data being saved
//         localStorage.setItem('user', JSON.stringify(user));
//         // Redirect to profile page after saving
//         window.location.href = 'profile.html'; 
//     }
// });











document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Check if user data is available
    if (userData) {
        console.log('User data retrieved for update:', userData); // Log retrieved data

        // Populate the form with existing user data
        document.getElementById('first-name').value = userData.firstName || '';
        document.getElementById('last-name').value = userData.lastName || '';
        document.getElementById('phone').value = userData.phone || '';
        document.getElementById('profession').value = userData.profession || '';
        document.getElementById('company').value = userData.company || '';
        document.getElementById('about-me').value = userData.aboutMe || '';

        // Display existing profile image if available
        if (userData.profileImage) {
            document.getElementById('existing-profile-image').src = userData.profileImage;
            document.getElementById('existing-profile-image').style.display = 'block'; // Show existing image
        }

        // Set the username and email as read-only fields
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');

        if (usernameInput && emailInput) {
            usernameInput.value = userData.username || ''; // Prefill username
            emailInput.value = userData.email || ''; // Prefill email
            usernameInput.setAttribute('readonly', true); // Make username non-editable
            emailInput.setAttribute('readonly', true); // Make email non-editable
        }

    } else {
        console.log('No user data found in local storage.');
        window.location.href = 'signup.html'; // Redirect if no user data found
    }

    // Handle form submission for updating profile
    document.getElementById('profile-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the updated user data from the form, but keep username and email unchanged
        const updatedUser = {
            firstName: document.getElementById('first-name').value || userData.firstName,
            lastName: document.getElementById('last-name').value || userData.lastName,
            phone: document.getElementById('phone').value || userData.phone,
            profession: document.getElementById('profession').value || userData.profession,
            company: document.getElementById('company').value || userData.company,
            aboutMe: document.getElementById('about-me').value || userData.aboutMe,
            username: userData.username, // Keep username unchanged
            email: userData.email, // Keep email unchanged
            profileImage: userData.profileImage // Keep the existing image unless updated
        };

        const profileImageInput = document.getElementById('profile-image').files[0];
        if (profileImageInput) {
            // Convert new image to Base64 if provided
            getBase64(profileImageInput, function (base64Image) {
                updatedUser.profileImage = base64Image;
                saveUpdatedProfile(updatedUser);
            });
        } else {
            saveUpdatedProfile(updatedUser); // Save without updating the image
        }
    });

    function saveUpdatedProfile(user) {
        // Save the updated user data back to local storage
        console.log('Saving updated user data:', user); // Log user data being saved
        localStorage.setItem('user', JSON.stringify(user));
        // Redirect to profile page after saving
        window.location.href = 'profile.html'; 
    }
});
