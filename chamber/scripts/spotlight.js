
// Function to fetch businesses from JSON
async function fetchBusinesses() {
    try {
        const response = await fetch('./data/members.json'); 
        const businesses = await response.json();
        return businesses;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return [];
    }
}

// Function to display spotlight members (Gold & Silver)
export function displaySpotlightMembers(businesses) {
    const cardContainer = document.getElementById('membership-cards'); // Reusing membership-cards container
    cardContainer.innerHTML = ''; 

    // Filter businesses by Gold and Silver membership
    const spotlightMembers = businesses.filter(business => business.membership_level === 2 || business.membership_level === 3);

    // Shuffle and select 2 or 3 random spotlight members
    const shuffledMembers = spotlightMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, 3);

    // Display the spotlight members in the same format as membership cards
    selectedMembers.forEach(business => {
        const card = document.createElement('div');
        card.classList.add('business-card');

        // Create card content dynamically
        card.innerHTML = `
            <h2 class="business-name">${business.name}</h2>
            <p class="business-tagline">${business.other_info.industry}</p>
            <hr>
            <div class="card-content">
                <img src="${business.image}" alt="${business.name}" class="business-logo">
                <div class="business-info">
                    <div><strong>Membership Level:</strong> ${business.membership_level === 3 ? 'Gold' : 'Silver'}</div>
                    <div><strong>Phone:</strong> ${business.phone}</div>
                    <div><strong>Adress:</strong> ${business.location}</div>
                    <div><strong>Email:</strong> ${business.email}</div>
                    <div><strong>URL:</strong> <a href="${business.website}" target="_blank">${business.website}</a></div>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

// Initialize spotlight display
export async function initSpotlight() {
    const businesses = await fetchBusinesses();
    displaySpotlightMembers(businesses);
}

