
// // Members
document.addEventListener('DOMContentLoaded', async function() {
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

    // Function to display membership cards in Grid view
    function displayMembershipCards(businesses) {
        const cardContainer = document.getElementById('membership-cards');
        cardContainer.innerHTML = '';
        cardContainer.classList.add('card-container');
        cardContainer.classList.remove('list-view');

        businesses.forEach(business => {
            const card = document.createElement('div');
            card.classList.add('business-card');

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
            cardContainer.appendChild(card);
        });
    }

    // Function to display membership data in List view
    function displayMembershipTable(businesses) {
        const cardContainer = document.getElementById('membership-cards');
        cardContainer.innerHTML = '';
        cardContainer.classList.add('list-view');

        // Create the table element
        const table = document.createElement('table');

        // Create table headers
        const tableHead = document.createElement('thead');
        tableHead.innerHTML = `
            <tr>
                <th>Business Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
            </tr>
        `;
        table.appendChild(tableHead);

        // Create table body and fill with business data
        const tableBody = document.createElement('tbody');
        businesses.forEach(business => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${business.name}</td>
                <td>${business.location}</td>
                <td>${business.phone}</td>
                <td><a href="${business.website}" target="_blank">${business.website}</a></td>
            `;
            tableBody.appendChild(row);
        });
        table.appendChild(tableBody);

        cardContainer.appendChild(table);
    }

    // Fetch and display the data
    const businesses = await fetchBusinesses();
    displayMembershipCards(businesses);

    // Toggle between grid and list views
    const toggleButton = document.getElementById('grid-list-toggle');
    const cardContainer = document.getElementById('membership-cards');
    
    toggleButton.addEventListener('click', function() {
        if (cardContainer.classList.contains('list-view')) {
            displayMembershipCards(businesses);
            toggleButton.src = 'images/grid.png'; // Change to grid icon
            toggleButton.classList.remove('list-icon');
            toggleButton.classList.add('grid-icon');
        } else {
            displayMembershipTable(businesses);
            toggleButton.src = 'images/list.png'; // Change to list icon
            toggleButton.classList.remove('grid-icon');
            toggleButton.classList.add('list-icon');
        }
    });
    
});
