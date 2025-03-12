package com.example.dinning_review_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dinning_review_app/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // get all restaurants
    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        for (Restaurant restaurant : restaurants) {
            List<Review> reviews = reviewRepository.findByRestaurantId(restaurant.getId());
            restaurant.setReviews(reviews);
        }
        return restaurants;
    }

    // get restaurant by id
    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = restaurantRepository.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        List<Review> reviews = reviewRepository.findByRestaurantId(id);
        restaurant.setReviews(reviews);
        return restaurant;
    }

    // add restaurant
    @PostMapping
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    // update restaurant
    @PutMapping("/{id}")
    public Restaurant updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurant) {
        Restaurant existingRestaurant = restaurantRepository.findById(id).orElseThrow(() -> new RuntimeException(" not found"));
        existingRestaurant.setName(restaurant.getName());
        existingRestaurant.setLocation(restaurant.getLocation());
        existingRestaurant.setCuisineType(restaurant.getCuisineType());
        existingRestaurant.setAverageRating(restaurant.getAverageRating());
        return restaurantRepository.save(existingRestaurant);
    }

    // delete restaurant
    @DeleteMapping("/{id}")
    public String deleteRestaurant(@PathVariable Long id) {
        restaurantRepository.deleteById(id);
        return "Restaurant deleted";
    }

    // add review to restaurant
    @PostMapping("/{restaurantId}/review")
    public Review addReview(@PathVariable Long restaurantId, @RequestBody Review review) {
        review.setRestaurantId(restaurantId);
        review.setUserId(1L); // set a default user id (for now)
        return reviewRepository.save(review);
    }

    // get reviews by restaurant id
    @GetMapping("/{restaurantId}/reviews")
    public List<Review> getReviewsByRestaurantId(@PathVariable Long restaurantId) {
        return reviewRepository.findByRestaurantId(restaurantId);
    }
}