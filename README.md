# Dining Review App

This is an early-stage project for a Dining Review Application. The application allows users to view a list of restaurants, add new restaurants, and submit reviews for each restaurant. 
The project is built using Spring Boot for the backend and vanilla JavaScript for the frontend.
The project is in an early stage and might have some issues that need to be resolved.
In this project i'm testing with more complex databases and data structures, adding more tables and relationships between them and implementing new functionalities.

## Features

- View a list of restaurants
- Add new restaurants
- View reviews for each restaurant
- Submit reviews for each restaurant (currently under development)

## Technologies Used

- Spring Boot
- Hibernate
- JPA
- JavaScript
- HTML
- CSS

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven
- A database (e.g., MySQL, PostgreSQL)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/dining-review-app.git
    cd dining-review-app
    ```

2. Configure the database:
    - Update the `application.properties` file with your database configuration.

3. Build the project:
    ```bash
    mvn clean install
    ```

4. Run the application:
    ```bash
    mvn spring-boot:run
    ```

5. Open your browser and navigate to `http://localhost:8080`.

## Project Structure

- `src/main/java/com/example/dinning_review_app/` - Contains the Java source code for the application.
- `src/main/resources/` - Contains the application configuration files.
- `src/main/resources/static/` - Contains the static files (HTML, CSS, JavaScript).

## Known Issues

- The "Submit Review" button is currently under development and does not work yet.
