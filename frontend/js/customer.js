let currentUser = null;
let bookingModal = null;

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

function showAlert(message, type = "danger") {
  const el = document.getElementById("alert");
  el.className = `alert alert-${type}`;
  el.textContent = message;
  setTimeout(() => el.classList.add("d-none"), 4000);
}

async function loadServices() {
  const grid = document.getElementById("servicesGrid");
  try {
    const data = await api.getServices();
    grid.innerHTML = (data.services || [])
      .map(
        (s) => `
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <div class="card service-card shadow-sm p-3">
            <div class="d-flex align-items-center gap-3 mb-2">
              <span class="service-icon"><i class="bi ${iconForService(s.name)}"></i></span>
              <h6 class="fw-bold mb-0">${s.name}</h6>
            </div>
            <p class="text-secondary small flex-grow-1">${s.description || ""}</p>
            <button class="btn btn-sm btn-brand w-100"
              onclick="openBooking(${s.id}, '${s.name.replace(/'/g, "")}')">Book Now</button>
          </div>
        </div>`
      )
      .join("");
  } catch (err) {
    grid.innerHTML = `<div class="col-12"><div class="alert alert-danger">${err.message}</div></div>`;
  }
}

async function loadBookings() {
  const body = document.getElementById("bookingsBody");
  try {
    const data = await api.getBookings(`?customerId=${currentUser.id}`);
    const bookings = data.bookings || [];
    if (!bookings.length) {
      body.innerHTML = '<tr><td colspan="8" class="text-center text-secondary py-4">No bookings yet.</td></tr>';
      return;
    }
    body.innerHTML = bookings
      .map(
        (b) => `
        <tr>
          <td>${b.id}</td>
          <td>#${b.serviceId}</td>
          <td>${b.bookingDate || ""}</td>
          <td>${b.bookingTime || ""}</td>
          <td class="text-truncate" style="max-width:180px;">${b.address || ""}</td>
          <td>Rs.${b.totalAmount ?? ""}</td>
          <td>${statusBadge(b.status)}</td>
          <td>${
            b.status === "completed"
              ? `<button class="btn btn-sm btn-outline-brand" onclick="payAndRate(${b.id}, ${b.totalAmount || 0})">Pay</button>`
              : ""
          }</td>
        </tr>`
      )
      .join("");
  } catch (err) {
    body.innerHTML = `<tr><td colspan="8" class="text-danger text-center py-4">${err.message}</td></tr>`;
  }
}

function openBooking(serviceId, serviceName) {
  document.getElementById("modalServiceId").value = serviceId;
  document.getElementById("modalServiceName").textContent = serviceName;
  bookingModal.show();
}

async function payAndRate(bookingId, amount) {
  try {
    await api.processPayment({ bookingId, userId: currentUser.id, amount, paymentMethod: "upi" });
    showAlert("Payment successful for booking #" + bookingId, "success");
    loadBookings();
  } catch (err) {
    showAlert(err.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  currentUser = session.requireRole("customer");
  if (!currentUser) return;

  document.getElementById("userName").textContent = currentUser.name;
  bookingModal = new bootstrap.Modal(document.getElementById("bookingModal"));

  document.getElementById("logoutBtn").addEventListener("click", () => {
    session.clear();
    window.location.href = "index.html";
  });

  document.getElementById("bookingForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      serviceId: Number(document.getElementById("modalServiceId").value),
      customerId: currentUser.id,
      bookingDate: document.getElementById("bookingDate").value,
      bookingTime: document.getElementById("bookingTime").value,
      address: document.getElementById("bookingAddress").value,
      totalAmount: Number(document.getElementById("bookingAmount").value),
      status: "pending",
    };
    try {
      await api.createBooking(payload);
      bookingModal.hide();
      showAlert("Booking created successfully!", "success");
      document.getElementById("bookingForm").reset();
      loadBookings();
    } catch (err) {
      showAlert(err.message);
    }
  });

  loadServices();
  loadBookings();
});
