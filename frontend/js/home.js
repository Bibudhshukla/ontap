let allServices = [];

function renderServices(services) {
  const grid = document.getElementById("servicesGrid");
  if (!services.length) {
    grid.innerHTML = '<div class="col-12 text-center text-secondary py-5">No services found.</div>';
    return;
  }
  grid.innerHTML = services
    .map(
      (s) => `
      <div class="col-sm-6 col-lg-4 col-xl-3">
        <div class="card service-card shadow-sm p-3">
          <div class="d-flex align-items-center gap-3 mb-3">
            <span class="service-icon"><i class="bi ${iconForService(s.name)}"></i></span>
            <h5 class="fw-bold mb-0">${s.name}</h5>
          </div>
          <p class="text-secondary flex-grow-1">${s.description || ""}</p>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span class="badge text-bg-light border">${s.priceRange || s.price_range || ""}</span>
            <a href="signin.html" class="btn btn-sm btn-outline-brand">Book Now</a>
          </div>
        </div>
      </div>`
    )
    .join("");
}

async function loadServices() {
  try {
    const data = await api.getServices();
    allServices = data.services || [];
    renderServices(allServices);
  } catch (err) {
    document.getElementById("servicesGrid").innerHTML =
      `<div class="col-12"><div class="alert alert-danger">Could not load services: ${err.message}.
       Make sure the Spring Boot API is running on http://localhost:8080.</div></div>`;
  }
}

function handleSearch() {
  const term = document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered = term
    ? allServices.filter(
        (s) => s.name.toLowerCase().includes(term) || (s.category || "").toLowerCase().includes(term)
      )
    : allServices;
  renderServices(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  loadServices();
  document.getElementById("searchBtn").addEventListener("click", handleSearch);
  document.getElementById("searchInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSearch();
  });
});
