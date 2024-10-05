
// Modal Logic
const modals = document.querySelectorAll('.modal');
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Add event listeners for "Learn More" buttons to open the respective modals
learnMoreButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const modalId = button.getAttribute('href').substring(1);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; 
        }
    });
});

// Add event listeners for close buttons to close modals
closeModalButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        modal.style.display = 'none'; 
    });
});



// Function to format the date in 12-hour format =========================================
function formatTimestampTo12Hour(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Form submit logic: Set the timestamp, show the progress bar, disable the button, and display progress with color change
const form = document.querySelector('.membership-form');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Set the hidden timestamp input to the current time in 12-hour format just before submission
    const submitTimestamp = formatTimestampTo12Hour(new Date());
    document.getElementById('timestamp').value = submitTimestamp;
    console.log('Timestamp set on form submission:', submitTimestamp);

    // Disable the submit button and show the progress bar
    submitButton.disabled = true;
    submitButton.style.display = 'none'; 

    const progressBar = document.getElementById('progress-bar');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const percentageText = document.getElementById('percentage-count');

    progressBar.style.display = 'block';
    percentageText.style.display = 'block';

    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += 9; // Increase progress by 9% each interval to leave room for final 100% step
        progressBarFill.style.width = progress + '%';
        percentageText.textContent = progress + '%'; // Update the percentage text

        // Change color as progress increases with darker shades
        if (progress <= 50) {
            // Darken the red to yellow transition
            progressBarFill.style.backgroundColor = `rgb(${180 - (progress * 2)}, 120, 0)`; // Dark red to dark yellow
        } else {
            // Darken the yellow to green transition
            progressBarFill.style.backgroundColor = `rgb(0, 150, ${150 - (progress * 1.5)})`; // Dark yellow to dark green
        }

        if (progress >= 90) {
            clearInterval(progressInterval);
            progressBarFill.style.width = '100%'; // Ensure it fills to 100%
            percentageText.textContent = '100%'; // Set final percentage to 100%
            
            setTimeout(() => {
                console.log('Progress complete. Submitting form...');
                form.submit(); // Submit the form after the progress bar reaches 100%
            }, 500); // Delay to allow the user to see 100% completion
        }
    }, 500); 
});



// ANIMATION FOR MEMBERSHIP CARD
function triggerInitialAnimation() {
    const cards = document.querySelectorAll('.membership-levels .card');
    
    setTimeout(() => {
        cards.forEach(card => {
            // Reset animation for the initial slide up effect
            card.style.animation = 'slideUp 2s ease-out forwards, changeColor 32s ease-in-out infinite'; 
        });
    }, 100); 
}
window.onload = () => {
    triggerInitialAnimation();
};


