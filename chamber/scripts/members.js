
// Members
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

            // Create the card content dynamically
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

            // Append the card to the container
            cardContainer.appendChild(card);
        });
    }

    // Function to display membership data in List (Table) view
    function displayMembershipTable(businesses) {
        const cardContainer = document.getElementById('membership-cards');
        cardContainer.innerHTML = ''; 
        cardContainer.classList.add('list-view'); 

        // Create the table element with Bootstrap classes
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-responsive'); 

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
                <td>${business.address}</td>
                <td>${business.phone}</td>
                <td><a href="${business.website}" target="_blank">${business.website}</a></td>
            `;
            tableBody.appendChild(row);
        });
        table.appendChild(tableBody);

        // Append the table to the container
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
        } else {
            displayMembershipTable(businesses); 
        }

        // Change the icon when toggling
        if (cardContainer.classList.contains('list-view')) {
            toggleButton.src = 'images/list.png'; 
            toggleButton.classList.add('large-icon');
        } else {
            toggleButton.src = 'images/grid.png'; 
            toggleButton.classList.remove('large-icon');
        }
    });
});
