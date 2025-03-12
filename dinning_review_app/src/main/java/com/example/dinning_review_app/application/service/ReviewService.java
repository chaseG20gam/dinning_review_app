package com.example.dinning_review_app.application.service;

import com.example.dinning_review_app.domain.model.Review;
import com.example.dinning_review_app.domain.repository.ReviewRepository;
import com.example.dinning_review_app.ports.in.ReviewUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService implements ReviewUseCase {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> getReviewsByRestaurantId(Long restaurantId) {
        return reviewRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }
}
