const apiUrl = 'http://localhost:8080/api/dinning_review_app/restaurant';
const reviewApiUrl = 'http://localhost:8080/api/dinning_review_app/restaurant';

// fetch and display restaurants
async function getRestaurants() {
    const response = await fetch(apiUrl);
    const restaurants = await response.json();
    const restaurantContainer = document.getElementById('restaurantContainer');
    restaurantContainer.innerHTML = '';
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'restaurant-card';
        restaurantCard.innerHTML = `
            <h2>${restaurant.name}</h2>
            <p><strong><img src="icons/location_ico.png" class="icon"> ${restaurant.location}</strong></p>
            <p><strong>Cuisine:</strong> ${restaurant.cuisineType}</p>
            <p><strong>Reviews:</strong> ${restaurant.reviews.map(review => review.reviewText).join('. ')}</p>
            <p><strong>Rating:</strong> ${restaurant.averageRating}</p>
            <div class="actions">
                <button onclick="navigateToEditRestaurant(${restaurant.id})">Edit</button>
                <button onclick="deleteRestaurant(${restaurant.id})">Delete</button>
                <button onclick="navigateToAddReview(${restaurant.id})">Add Review</button>
            </div>
        `;
        restaurantContainer.appendChild(restaurantCard);
    });
}

// handle restaurant form submit
document.getElementById('restaurantForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('restaurantId').value;
    const restaurant = {
        name: document.getElementById('name').value,
        location: document.getElementById('location').value,
        cuisineType: document.getElementById('cuisine_type').value,
        averageRating: document.getElementById('average_rating').value
    }

    if (id) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurant)
        });
    } else {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurant)
        });
    }

    window.location.href = 'index.html';
});

// handle review form submit
document.getElementById('reviewForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const restaurantId = document.getElementById('reviewRestaurantId').value;
    const review = document.getElementById('review').value;

    await fetch(`${reviewApiUrl}/${restaurantId}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reviewText: review, userId: 1 }) // set a default user ID for now
    });

    window.location.href = 'index.html';
});

// navigate to edit restaurant page
async function navigateToEditRestaurant(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const restaurant = await response.json();
    localStorage.setItem('restaurantId', restaurant.id);
    localStorage.setItem('restaurantName', restaurant.name);
    localStorage.setItem('restaurantLocation', restaurant.location);
    localStorage.setItem('restaurantCuisineType', restaurant.cuisineType);
    localStorage.setItem('restaurantAverageRating', restaurant.averageRating);
    window.location.href = 'edit_restaurant.html';
}

// delete restaurant
async function deleteRestaurant(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    getRestaurants();
}

// navigate to add review page
function navigateToAddReview(restaurantId) {
    localStorage.setItem('reviewRestaurantId', restaurantId);
    window.location.href = 'add_review.html';
}

// initial fetch
if (document.getElementById('restaurantContainer')) {
    getRestaurants();
}

// set restaurant ID for review form
if (document.getElementById('reviewRestaurantId')) {
    document.getElementById('reviewRestaurantId').value = localStorage.getItem('reviewRestaurantId');
}

// pre-fill edit restaurant form
if (document.getElementById('restaurantId') && window.location.pathname.endsWith('edit_restaurant.html')) {
    document.getElementById('restaurantId').value = localStorage.getItem('restaurantId');
    document.getElementById('name').value = localStorage.getItem('restaurantName');
    document.getElementById('location').value = localStorage.getItem('restaurantLocation');
    document.getElementById('cuisine_type').value = localStorage.getItem('restaurantCuisineType');
    document.getElementById('average_rating').value = localStorage.getItem('restaurantAverageRating');
}