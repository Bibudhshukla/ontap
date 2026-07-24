function statCard(label, value, icon) {
  return `
    <div class="col-6 col-md-4 col-lg-2">
      <div class="card stat-card p-3 text-center">
        <div class="service-icon mx-auto mb-2"><i class="bi ${icon}"></i></div>
        <h4 class="fw-bold mb-0">${value}</h4>
        <small class="text-secondary">${label}</small>
      </div>
    </div>`;
}

function statusBadge(status) {
  const map = {
    pending: "text-bg-warning",
    confirmed: "text-bg-info",
    "in-progress": "text-bg-primary",
    completed: "text-bg-success",
    cancelled: "text-bg-danger",
  };
  return `<span class="badge status-badge ${map[status] || "text-bg-secondary"}">${status}</span>`;
}

async function loadAll() {
  try {
    const [stats, users, bookings] = await Promise.all([
      api.adminStats(),
      api.adminUsers(),
      api.adminBookings(),
    ]);

    document.getElementById("statsRow").innerHTML =
      statCard("Total Users", stats.totalUsers, "bi-people") +
      statCard("Customers", stats.customers, "bi-person") +
      statCard("Providers", stats.providers, "bi-person-badge") +
      statCard("Services", stats.totalServices, "bi-grid") +
      statCard("Bookings", stats.totalBookings, "bi-calendar-check") +
      statCard("Tickets", stats.openTickets, "bi-life-preserver");

    document.getElementById("usersBody").innerHTML = (users.users || [])
      .map(
        (u) =>
          `<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td>
           <td><span class="badge text-bg-light border text-capitalize">${u.userType}</span></td></tr>`
      )
      .join("") || '<tr><td colspan="4" class="text-center text-secondary py-4">No users.</td></tr>';

    document.getElementById("bookingsBody").innerHTML = (bookings.bookings || [])
      .map(
        (b) =>
          `<tr><td>${b.id}</td><td>#${b.serviceId}</td><td>${b.bookingDate || ""}</td><td>${statusBadge(b.status)}</td></tr>`
      )
      .join("") || '<tr><td colspan="4" class="text-center text-secondary py-4">No bookings.</td></tr>';
  } catch (err) {
    const el = document.getElementById("alert");
    el.className = "alert alert-danger";
    el.textContent = err.message + " Make sure the Spring Boot API is running on http://localhost:8080.";
  }
}

document.addEventListener("DOMContentLoaded", loadAll);
