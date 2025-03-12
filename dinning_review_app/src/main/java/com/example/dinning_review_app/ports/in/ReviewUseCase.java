package com.example.dinning_review_app.ports.in;

import com.example.dinning_review_app.domain.model.Review;

import java.util.List;

public interface ReviewUseCase {
    List<Review> getReviewsByRestaurantId(Long restaurantId);
    Review addReview(Review review);
}