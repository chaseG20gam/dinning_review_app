package com.example.dinning_review_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.dinning_review_app")
@EntityScan(basePackages = "com.example.dinning_review_app.domain.model")
@EnableJpaRepositories(basePackages = "com.example.dinning_review_app.domain.repository")
public class DinningReviewAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(DinningReviewAppApplication.class, args);
    }
}