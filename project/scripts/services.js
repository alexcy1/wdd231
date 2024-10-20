// Array to store the news categories, descriptions, and images
const newsCategories = [
    {
        name: 'US',
        message: 'Breaking news and in-depth analysis of the United States, covering politics, economy, culture, and major events shaping the nation today.',
        image: '../images/us-news.webp'
    },
    {
        name: 'Upshot',
        message: 'Unique insights into politics, economics, and daily life, offering data-driven analysis and thought-provoking articles on important trends.',
        image: '../images/upshot.webp'
    },
    {
        name: 'Business',
        message: 'Latest updates and trends from the business world, including market movements, entrepreneurship, financial news, and corporate insights.',
        image: '../images/business-news.webp'
    },
    {
        name: 'World',
        message: 'Top international news and events from around the globe, providing a broad perspective on global politics, conflicts, diplomacy, and culture.',
        image: '../images/world-news.webp'
    },
    {
        name: 'Technology',
        message: 'Stay updated on the latest in technology and innovation, from cutting-edge startups to major advancements in AI, cybersecurity, and more.',
        image: '../images/technology-news.webp'
    },
    {
        name: 'NY Region',
        message: 'News and events from New York and its surrounding areas, from local politics to cultural events, providing a snapshot of life in the Big Apple.',
        image: '../images/ny-region-news.webp'
    },
    {
        name: 'Style',
        message: 'Explore the latest trends in fashion, beauty, and culture, highlighting the influence of global design and creativity on contemporary lifestyles.',
        image: '../images/style-news.webp'
    },
    {
        name: 'Opinion',
        message: 'Thought-provoking opinions and editorial pieces from leading voices, covering a wide range of topics from current events to social commentary.',
        image: '../images/opinion-news.webp'
    },
    {
        name: 'Briefing',
        message: 'Daily briefings of the most important news highlights, offering concise summaries to keep you informed about key events across the globe.',
        image: '../images/briefing-news.webp'
    },
    {
        name: 'Books',
        message: 'Reviews, recommendations, and news about books, featuring both classic literature and the latest releases from renowned and upcoming authors.',
        image: '../images/books-news.webp'
    },
    {
        name: 'Arts',
        message: 'Dive into the world of arts, including music, film, theater, and visual arts, with in-depth analysis and reviews from the cultural landscape.',
        image: '../images/arts-news.webp'
    }
];

// Function to create service cards and lazy load images
function displayServices() {
    const servicesContainer = document.getElementById('services-container');

    newsCategories.forEach(category => {
        const serviceCard = document.createElement('div');
        serviceCard.classList.add('service-card');

        serviceCard.innerHTML = `
            <img 
                data-src="images/${category.image}" 
                alt="${category.name}" 
                class="lazy-load"
                loading="lazy"
            />
            <div class="service-card-content">
                <h3>${category.name}</h3>
                <p>${category.message}</p>
            </div>
        `;

        servicesContainer.appendChild(serviceCard);
    });

    // Lazy load the images
    lazyLoadImages();
}

// Lazy loading logic remains the same
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.lazy-load');

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.getAttribute('data-src');
                image.classList.add('loaded');
                observer.unobserve(image); 
            }
        });
    });

    lazyImages.forEach(image => {
        intersectionObserver.observe(image);
    });
}

// Display the services when the page loads
document.addEventListener('DOMContentLoaded', displayServices);
