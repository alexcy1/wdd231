
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('.lazy-load');

    // Function to handle lazy loading of images
    const lazyLoad = () => {
        lazyImages.forEach(image => {
            if (image.getBoundingClientRect().top < window.innerHeight && image.dataset.src) {
                image.src = image.dataset.src;

                // Add loaded class after the image has loaded
                image.onload = () => {
                    image.classList.add('loaded');
                };
                image.removeAttribute('data-src');
            }
        });
    };

    // Hide images initially
    lazyImages.forEach(image => {
        image.style.display = 'none'; 
    });

    // Add event listener for scroll
    window.addEventListener('scroll', () => {
        lazyLoad();
        lazyImages.forEach(image => {
            image.style.display = 'block';
        });
    });

    lazyLoad();
});



// Handle selected sidebar menu item (e.g., Local Attractions is selected by default)
document.querySelector('.local-section').classList.add('selected');



// Visitor message based on last visit ===================================================
document.addEventListener('DOMContentLoaded', () => {
    const lastVisit = localStorage.getItem('last-visit');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    let message = '';

    if (lastVisit) {
        const lastVisitTime = parseInt(lastVisit); // Convert the last visit to a number
        const timeDifference = now - lastVisitTime;
        const daysSinceLastVisit = Math.floor(timeDifference / oneDay);

        // If less than a day has passed
        if (timeDifference < oneDay) {
            message = 'Back so soon! Awesome!';
        } 
        // If exactly one day has passed
        else if (daysSinceLastVisit === 1) {
            message = 'You last visited 1 day ago.';
        } 
        // More than one day has passed
        else {
            message = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    } 
    // First-time visit
    else {
        message = 'Welcome! Let us know if you have any questions.';
    }

    // Display the message
    document.getElementById('visitor-message').textContent = message;

    // Update the last visit time
    localStorage.setItem('last-visit', now);
});






// CALENDAR ========================================================================
document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    // Function to render the calendar
    function renderCalendar(month, year) {
        calendar.innerHTML = ''; // Clear previous calendar
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const currentDate = new Date().getDate();
        const today = new Date().getMonth() === month && new Date().getFullYear() === year;

        // Create the calendar header
        const calendarHeader = document.createElement('div');
        calendarHeader.classList.add('calendar-header');
        calendarHeader.innerHTML = `
            <button id="prev-month">&laquo;</button>
            <div>${monthNames[month]} ${year}</div>
            <button id="next-month">&raquo;</button>
        `;
        calendar.appendChild(calendarHeader);

        // Create the day labels (Sun, Mon, etc.)
        const dayLabelContainer = document.createElement('div');
        dayLabelContainer.classList.add('calendar-days');
        daysInWeek.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = day;
            dayLabel.style.fontWeight = 'bold'; // Make day names bold
            dayLabelContainer.appendChild(dayLabel);
        });
        calendar.appendChild(dayLabelContainer);

        // Create the grid for the days of the month
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('calendar-days');

        // Add empty cells for the days before the first of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            dayContainer.appendChild(emptyCell);
        }

        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;

            // Highlight today's date
            if (today && day === currentDate) {
                dayCell.classList.add('current-day');
            }

            dayContainer.appendChild(dayCell);
        }

        calendar.appendChild(dayContainer);

        // Event listeners for changing months
        document.getElementById('prev-month').addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });

        document.getElementById('next-month').addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }

    // Initial rendering of the current month
    renderCalendar(currentMonth, currentYear);
});

