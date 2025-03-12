package com.example.dinning_review_app.adapters.persistence;

import com.example.dinning_review_app.domain.model.Review;
import com.example.dinning_review_app.domain.repository.ReviewRepository;

import java.util.List;

public interface JpaReviewRepository extends ReviewRepository {
    List<Review> findByRestaurantId(Long restaurantId);
}