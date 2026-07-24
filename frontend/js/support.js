function showAlert(message, type = "danger") {
  const el = document.getElementById("alert");
  el.className = `alert alert-${type}`;
  el.textContent = message;
  setTimeout(() => el.classList.add("d-none"), 4000);
}

const priorityBadge = {
  low: "text-bg-secondary",
  medium: "text-bg-info",
  high: "text-bg-warning",
  urgent: "text-bg-danger",
};

async function loadTickets() {
  const list = document.getElementById("ticketList");
  try {
    const data = await api.getTickets();
    const tickets = data.tickets || [];
    if (!tickets.length) {
      list.innerHTML = '<div class="text-secondary">No tickets yet.</div>';
      return;
    }
    list.innerHTML = tickets
      .map(
        (t) => `
        <div class="card border-0 shadow-sm p-3">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="fw-bold mb-1">${t.subject}</h6>
              <p class="text-secondary small mb-1">${t.description || ""}</p>
              <span class="badge text-bg-light border text-capitalize">${t.category}</span>
            </div>
            <div class="text-end">
              <span class="badge ${priorityBadge[t.priority] || "text-bg-secondary"} text-capitalize">${t.priority}</span>
              <div class="badge text-bg-light border text-capitalize mt-1">${t.status}</div>
            </div>
          </div>
        </div>`
      )
      .join("");
  } catch (err) {
    list.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const user = session.get();
  document.getElementById("ticketForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      userId: user ? user.id : null,
      subject: document.getElementById("subject").value.trim(),
      description: document.getElementById("description").value.trim(),
      category: document.getElementById("category").value,
      priority: document.getElementById("priority").value,
    };
    try {
      await api.createTicket(payload);
      showAlert("Ticket submitted successfully!", "success");
      document.getElementById("ticketForm").reset();
      loadTickets();
    } catch (err) {
      showAlert(err.message);
    }
  });

  loadTickets();
});
