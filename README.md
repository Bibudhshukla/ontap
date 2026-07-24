# OnTap – Online Service Provider Platform

OnTap is a full-stack web application that connects customers with trusted local service providers. Users can easily search, book, and manage services such as plumbing, electrical work, cleaning, beauty services, and more through a simple and user-friendly interface.

---

## Features

### Customer
- User registration and login
- Browse service categories
- Search for nearby service providers
- Book services online
- View booking history
- Manage profile information

### Service Provider
- Provider registration
- Manage offered services
- Accept or reject booking requests
- Update availability
- View customer bookings

### Admin
- Manage users
- Manage service providers
- Manage service categories
- Monitor bookings
- Dashboard with platform statistics

---

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring MVC
- Spring Data JPA
- Spring Security
- REST API

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap


### Database
- MySQL

### Build Tool
- Maven

### Version Control
- Git
- GitHub

---

## Project Structure

```
OnTap
│
├── src
│   ├── main
│   │   ├── java
│   │   ├── resources
│   │   └── webapp
│   └── test
│
├── pom.xml
├── README.md
└── application.properties
```

---

## Installation

### Prerequisites

- Java 17 or above
- Maven
- MySQL
- Git

### Clone Repository

```bash
git clone https://github.com/your-username/OnTap.git
```

### Configure Database

Update the database credentials in:

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ontap
spring.datasource.username=root
spring.datasource.password=your_password
```

### Build Project

```bash
mvn clean install
```

### Run Application

```bash
mvn spring-boot:run
```

The application will start on:

```
http://localhost:8080
```

---

## Database

Create a MySQL database named:

```
ontap
```

Import the SQL file (if available) before running the project.

---

## Screenshots

Add screenshots here.

```
screenshots/
├── home.png
├── login.png
├── services.png
├── booking.png
└── admin-dashboard.png
```

---

## Future Enhancements

- Online payment integration
- Real-time booking notifications
- Email and SMS alerts
- Provider ratings and reviews
- Live location tracking
- Mobile application support

---

## Learning Outcomes

This project helped in understanding:

- Spring Boot application development
- RESTful API implementation
- Authentication and authorization
- Database design with MySQL
- MVC architecture
- CRUD operations
- Full-stack web development
- Git and GitHub collaboration

---

## Author

**Bibudh Shukla**

- MCA Graduate (2026)
- Java Full Stack Developer


---

## License

This project is developed for educational and learning purposes.
