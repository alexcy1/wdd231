// SLIDER ==============================================================================
import { fetchArticles } from './api.js'; 

let articles = [];
const sliderContainer = document.getElementById('slider');
let autoSlideInterval;

// Display random articles for the slider
function displayRandomArticles() {
    const shuffledArticles = articles.sort(() => 0.5 - Math.random()); // Shuffle articles array
    const randomArticles = shuffledArticles.slice(0, 3); // Get the first 3 randomized articles
    displayArticlesOnSlider(randomArticles); // Pass the randomized articles to the slider display function
}

function displayArticlesOnSlider(articlesToDisplay) {
    sliderContainer.innerHTML = ''; // Clear existing articles
    articlesToDisplay.forEach((article, index) => {
        const card = document.createElement('div');
        card.className = `article-card ${index === 0 ? 'large' : ''}`;
        card.innerHTML = `
            <img src="${article.multimedia[0]?.url || 'default-image-url.jpg'}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p><a href="${article.url}" target="_blank">Read more</a></p>
        `;
        sliderContainer.appendChild(card);
    });
}

// Swap the current article for a new random article with a smooth transition
function swapArticle() {
    const randomArticleIndex = Math.floor(Math.random() * articles.length);
    const article = articles[randomArticleIndex];

    const newCard = document.createElement('div');
    newCard.className = 'article-card large';
    newCard.innerHTML = `
        <img src="${article.multimedia[0]?.url || 'default-image-url.jpg'}" alt="${article.title}">
        <h2>${article.title}</h2>
        <p><a href="${article.url}" target="_blank">Read more</a></p>
    `;

    const existingCards = sliderContainer.children;
    if (existingCards.length > 0) {
        existingCards[0].classList.add('fade-out');
        setTimeout(() => {
            sliderContainer.replaceChild(newCard, existingCards[0]);
            newCard.classList.add('fade-in');
        }, 500);
    } else {
        sliderContainer.appendChild(newCard);
        newCard.classList.add('fade-in');
    }
}

// Move to the next article on button click
document.getElementById('next').addEventListener('click', swapArticle);
document.getElementById('prev').addEventListener('click', swapArticle);

// Start automatic sliding of articles
function startAutoSlide() {
    autoSlideInterval = setInterval(swapArticle, 5000); // Change slide every 5 seconds
}

// Stop auto sliding on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
slider.addEventListener('mouseout', startAutoSlide);

// Fetch articles when the page loads
fetchArticles().then(fetchedArticles => {
    articles = fetchedArticles;
    displayRandomArticles();
    startAutoSlide();
});




// ARTICLES =============================================================================

let currentPage = 0;
const articlesPerPage = 12;
let filteredArticles = []; // Store filtered articles based on section
let activeSectionElement = null; // Track the currently active section element

// Display trending sections
function displayTrendingSections() {
    const trendingSections = document.querySelector('.trending-sections');
    const sections = [...new Set(articles.map(article => article.section))];

   // Create the HTML for trending sections
    trendingSections.innerHTML = `
    <h3>Trending News:</h3>
    ${sections.map(section => `
        <span class="trending-section" data-section="${section}">${section}</span>
    `).join(', ')}
    <button class="show-all">Show All</button> <!-- Show All button -->
    <a href="index.html" class="reload-button">Reload</a> <!-- Reload button with link to index.html -->
    `;


    // Add event listeners to each trending section
    const trendingSectionElements = document.querySelectorAll('.trending-section');
    trendingSectionElements.forEach(sectionElement => {
        sectionElement.addEventListener('click', () => {
            const selectedSection = sectionElement.getAttribute('data-section');
            filterArticlesBySection(selectedSection);

            // Manage the active state
            if (activeSectionElement) {
                activeSectionElement.classList.remove('active'); // Remove active class from the previous element
            }
            sectionElement.classList.add('active'); // Add active class to the clicked element
            activeSectionElement = sectionElement; // Set the clicked element as the active element
        });
    });

    // Add event listener for "Show All" button
    document.querySelector('.show-all').addEventListener('click', () => {
        filteredArticles = []; // Reset filtered articles
        displayArticles(); // Display all articles

        // Remove active state from any section when "Show All" is clicked
        if (activeSectionElement) {
            activeSectionElement.classList.remove('active');
            activeSectionElement = null;
        }
    });
}

// Filter articles by section
function filterArticlesBySection(section) {
    filteredArticles = articles.filter(article => article.section === section); // Filter articles
    currentPage = 0; // Reset current page
    displayArticles(); // Display filtered articles
}

// Display articles on the page
function displayArticles() {
    const articlesContainer = document.querySelector('.articles-container');
    const articlesToDisplay = filteredArticles.length ? filteredArticles : articles; // Use filtered articles if available
    const startIndex = currentPage * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = articlesToDisplay.slice(startIndex, endIndex); // Get paginated articles

    articlesContainer.innerHTML = ''; // Clear the articles container

    paginatedArticles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('articles-card');
        articleCard.innerHTML = `
            <img src="${article.multimedia[0]?.url || 'default-image-url.jpg'}" alt="${article.title}" class="article-image" />
            <h2 class="article-headline">${article.title}</h2>
            <p class="article-date">${new Date(article.published_date).toLocaleDateString()}</p>
            <button class="details-button" data-article='${JSON.stringify(article)}'>Details</button>
            <a href="${article.url}" target="_blank" class="view-button">View</a>
        `;
        articlesContainer.appendChild(articleCard);
    });

    // Add event listeners to "Details" buttons
    const detailButtons = document.querySelectorAll('.details-button');
    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const article = JSON.parse(event.target.dataset.article);
            openModal(article);
        });
    });
}

// Open the modal with article details
function openModal(article) {
    document.getElementById('modal-title').innerText = article.title;
    document.getElementById('modal-abstract').innerText = article.abstract;
    document.getElementById('modal-image').src = article.multimedia[0]?.url || 'default-image-url.jpg';
    document.getElementById('modal-date').innerText = new Date(article.published_date).toLocaleDateString();
    document.getElementById('article-modal').style.display = 'block';
}

// Close the modal
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('article-modal').style.display = 'none';
});

// Load more articles on button click
document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    displayArticles();
});

// Fetch articles when the page loads
fetchArticles().then(fetchedArticles => {
    articles = fetchedArticles;
    displayTrendingSections();
    displayArticles();
});
