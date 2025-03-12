package com.example.dinning_review_app.domain.repository;

import com.example.dinning_review_app.domain.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}