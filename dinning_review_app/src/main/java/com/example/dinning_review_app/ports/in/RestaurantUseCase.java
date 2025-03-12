package com.example.dinning_review_app.ports.in;

import com.example.dinning_review_app.domain.model.Restaurant;

import java.util.List;

public interface RestaurantUseCase {
    List<Restaurant> getAllRestaurants();
    Restaurant getRestaurantById(Long id);
    Restaurant addRestaurant(Restaurant restaurant);
    Restaurant updateRestaurant(Long id, Restaurant restaurant);
    void deleteRestaurant(Long id);
}