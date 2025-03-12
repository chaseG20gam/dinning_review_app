package com.example.dinning_review_app.adapters.web;

import com.example.dinning_review_app.domain.model.Review;
import com.example.dinning_review_app.application.service.RestaurantService;
import com.example.dinning_review_app.application.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/dinning_review_app/restaurant")
public class ReviewController {
    
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(RestaurantService restaurantService, ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // add review to restaurant
    @PostMapping("/{restaurantId}/review")
    public Review addReview(@PathVariable Long restaurantId, @RequestBody Review review) {
        review.setRestaurantId(restaurantId);
        review.setUserId(1L); // Set a default user id for now
        return reviewService.addReview(review);
    }

    // get reviews by restaurant id
    @GetMapping("/{restaurantId}/reviews")
    public List<Review> getReviewsByRestaurantId(@PathVariable Long restaurantId) {
        return reviewService.getReviewsByRestaurantId(restaurantId);
    }

}
