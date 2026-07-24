/* Central API helper for the On-Tap Bootstrap frontend. */
const API_BASE = "http://localhost:8080/api";

async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  if (!res.ok) {
    const message = (data && data.error) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

const api = {
  // Auth
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(payload) }),

  // Services
  getServices: () => apiRequest("/services"),
  createService: (payload) => apiRequest("/services", { method: "POST", body: JSON.stringify(payload) }),

  // Bookings
  getBookings: (query = "") => apiRequest(`/bookings${query}`),
  createBooking: (payload) => apiRequest("/bookings", { method: "POST", body: JSON.stringify(payload) }),
  updateBookingStatus: (id, status) =>
    apiRequest(`/bookings/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),

  // Ratings
  submitRating: (payload) => apiRequest("/ratings", { method: "POST", body: JSON.stringify(payload) }),

  // Payments
  processPayment: (payload) => apiRequest("/payments/process", { method: "POST", body: JSON.stringify(payload) }),

  // Support
  getTickets: () => apiRequest("/support/tickets"),
  createTicket: (payload) => apiRequest("/support/tickets", { method: "POST", body: JSON.stringify(payload) }),

  // Admin
  adminStats: () => apiRequest("/admin/stats"),
  adminUsers: () => apiRequest("/admin/users"),
  adminBookings: () => apiRequest("/admin/bookings"),
};

/* Simple session helpers (localStorage is used only for the logged-in user handle). */
const session = {
  set: (user) => localStorage.setItem("ontap_user", JSON.stringify(user)),
  get: () => {
    const raw = localStorage.getItem("ontap_user");
    return raw ? JSON.parse(raw) : null;
  },
  clear: () => localStorage.removeItem("ontap_user"),
  requireRole: (role, redirect = "signin.html") => {
    const user = session.get();
    if (!user || (role && user.user_type !== role)) {
      window.location.href = redirect;
      return null;
    }
    return user;
  },
};

/* Map service names to Bootstrap Icons. */
function iconForService(name) {
  const map = {
    Plumbing: "bi-wrench-adjustable",
    Cleaning: "bi-stars",
    Carpentry: "bi-hammer",
    Electrical: "bi-lightning-charge",
    HVAC: "bi-thermometer-half",
    Painting: "bi-palette",
    "Appliance Repair": "bi-gear",
    "Pest Control": "bi-bug",
    Landscaping: "bi-tree",
    "Moving Services": "bi-truck",
    "Pet Care": "bi-heart",
    Handyman: "bi-tools",
  };
  return map[name] || "bi-tools";
}
