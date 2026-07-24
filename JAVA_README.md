# On-Tap — Java Spring Boot + MySQL + Bootstrap

This is the On-Tap home-services marketplace rebuilt as a classic 3-tier app:

- **Backend:** Java 17 + Spring Boot 3 (REST API) + Spring Data JPA
- **Database:** MySQL 8
- **Frontend:** static HTML + CSS + JavaScript + Bootstrap 5 (calls the REST API with `fetch`)

```
backend/    -> Spring Boot REST API (Maven project)
frontend/   -> HTML/CSS/JS + Bootstrap client
```

---

## 1. Prerequisites

- JDK 17+
- Maven 3.9+ (or use the bundled `mvnw` if you generate one)
- MySQL 8 running locally

## 2. Configure the database

By default the app connects to:

```
URL:      jdbc:mysql://localhost:3306/on_tap_db   (auto-created)
username: root
password: root
```

Change these in `backend/src/main/resources/application.properties` to match your MySQL.
Tables are created automatically by Hibernate on first run, and demo services + users
are seeded from `data.sql`. (You can also run `backend/database.sql` manually if you prefer.)

## 3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

API starts at **http://localhost:8080**.

## 4. Run the frontend

The frontend is static — serve the `frontend/` folder with any static server so the
browser can call the API (opening files directly with `file://` will break `fetch`/CORS):

```bash
cd frontend
python3 -m http.server 5500
# then open http://localhost:5500
```

(VS Code "Live Server" on port 5500 works too. CORS for `/api/**` is already enabled.)

---

## Demo accounts (password: `password123`)

| Role     | Email               |
|----------|---------------------|
| Customer | amit@example.com    |
| Provider | rajesh@example.com  |

## REST API endpoints

| Method | Path                          | Description                       |
|--------|-------------------------------|-----------------------------------|
| POST   | `/api/auth/register`          | Register customer/provider        |
| POST   | `/api/auth/login`             | Login                             |
| GET    | `/api/services`               | List services                     |
| POST   | `/api/services`               | Create a service                  |
| GET    | `/api/bookings`               | List bookings (`?customerId=` / `?providerId=`) |
| POST   | `/api/bookings`               | Create a booking                  |
| PATCH  | `/api/bookings/{id}/status`   | Update booking status             |
| GET    | `/api/ratings`                | List ratings (`?providerId=`)     |
| POST   | `/api/ratings`                | Submit a rating                   |
| POST   | `/api/payments/process`       | Process a (simulated) payment     |
| GET    | `/api/support/tickets`        | List support tickets              |
| POST   | `/api/support/tickets`        | Create a support ticket           |
| GET    | `/api/admin/stats`            | Platform stats                    |
| GET    | `/api/admin/users`            | All users                         |
| GET    | `/api/admin/bookings`         | All bookings                      |

## Frontend pages

- `index.html` — landing page + service catalog
- `signin.html` / `signup.html` — auth (role-aware)
- `dashboard-customer.html` — browse services, book, pay
- `dashboard-provider.html` — accept/start/complete jobs
- `admin.html` — platform stats, users, bookings
- `support.html` — raise & view support tickets
