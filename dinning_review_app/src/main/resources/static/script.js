const apiUrl = 'http://localhost:8080/api/dinning_review_app/restaurant';
const reviewApiUrl = 'http://localhost:8080/api/dinning_review_app/restaurant';

// fetch and display restaurants
async function getRestaurants() {
    const response = await fetch(apiUrl);
    const restaurants = await response.json();
    const tbody = document.querySelector('#restaurant tbody');
    tbody.innerHTML = '';
    restaurants.forEach(restaurant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${restaurant.id}</td>
            <td>${restaurant.name}</td>
            <td>${restaurant.location}</td>
            <td>${restaurant.cuisineType}</td>
            <td>${restaurant.averageRating}</td>
            <td>${restaurant.reviews.map(review => review.reviewText).join(', ')}</td>
            <td>
                <button onclick="navigateToEditRestaurant(${restaurant.id})">Edit</button>
                <button onclick="deleteRestaurant(${restaurant.id})">Delete</button>
                <button onclick="navigateToAddReview(${restaurant.id})">Add Review</button>
            </td>
        `;
        tbody.appendChild(row);
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
        body: JSON.stringify({ reviewText: review })
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
    window.location.href = 'add_review.html'; //undersocre!!
}

// initial fetch
if (document.querySelector('#restaurant')) {
    getRestaurants();
}

// set restaurant ID for review form
if (document.getElementById('reviewRestaurantId')) {
    document.getElementById('reviewRestaurantId').value = localStorage.getItem('reviewRestaurantId');
}

// pre-fill edit restaurant form
if (document.getElementById('restaurantId') && window.location.pathname.endsWith('edit_restaurant.html')) { //undersocre!!
    document.getElementById('restaurantId').value = localStorage.getItem('restaurantId');
    document.getElementById('name').value = localStorage.getItem('restaurantName');
    document.getElementById('location').value = localStorage.getItem('restaurantLocation');
    document.getElementById('cuisine_type').value = localStorage.getItem('restaurantCuisineType');
    document.getElementById('average_rating').value = localStorage.getItem('restaurantAverageRating');
}