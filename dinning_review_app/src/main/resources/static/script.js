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
                <button onclick="editRestaurant(${restaurant.id})">Edit</button>
                <button onclick="deleteRestaurant(${restaurant.id})">Delete</button>
                <button onclick="showReviewForm(${restaurant.id})">Add Review</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// handle form submit
document.getElementById('restaurantForm').addEventListener('submit', async (e) => {
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

    getRestaurants();
    document.getElementById('restaurantForm').reset();
    document.getElementById('restaurantId').value = '';
});

// handle review form submit
document.getElementById('reviewForm').addEventListener('submit', async (e) => {
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

    getRestaurants();
    document.getElementById('reviewForm').reset();
    document.getElementById('reviewForm').style.display = 'none';
});

// edit restaurant
async function editRestaurant(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const restaurant = await response.json();
    document.getElementById('restaurantId').value = restaurant.id;
    document.getElementById('name').value = restaurant.name;
    document.getElementById('location').value = restaurant.location;
    document.getElementById('cuisine_type').value = restaurant.cuisineType;
    document.getElementById('average_rating').value = restaurant.averageRating;
}

// delete restaurant
async function deleteRestaurant(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    getRestaurants();
}

// show review form
function showReviewForm(restaurantId) {
    document.getElementById('reviewRestaurantId').value = restaurantId;
    document.getElementById('reviewForm').style.display = 'block';
}

// initial fetch
getRestaurants();