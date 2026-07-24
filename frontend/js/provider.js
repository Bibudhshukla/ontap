let currentUser = null;

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

function nextAction(b) {
  // Provider workflow: accept (pending->confirmed), start (confirmed->in-progress), complete
  if (b.status === "pending")
    return `<button class="btn btn-sm btn-brand" onclick="advance(${b.id}, 'confirmed')">Accept</button>`;
  if (b.status === "confirmed")
    return `<button class="btn btn-sm btn-brand" onclick="advance(${b.id}, 'in-progress')">Start</button>`;
  if (b.status === "in-progress")
    return `<button class="btn btn-sm btn-success" onclick="advance(${b.id}, 'completed')">Complete</button>`;
  return "&mdash;";
}

async function advance(id, status) {
  try {
    await api.updateBookingStatus(id, status);
    showAlert(`Job #${id} marked ${status}.`, "success");
    loadJobs();
  } catch (err) {
    showAlert(err.message);
  }
}

async function loadJobs() {
  const body = document.getElementById("jobsBody");
  try {
    // Providers see all bookings (jobs available to accept + their assigned ones)
    const data = await api.getBookings();
    const jobs = data.bookings || [];

    const counts = { total: jobs.length, pending: 0, progress: 0, done: 0 };
    jobs.forEach((b) => {
      if (b.status === "pending") counts.pending++;
      else if (b.status === "in-progress") counts.progress++;
      else if (b.status === "completed") counts.done++;
    });
    document.getElementById("statTotal").textContent = counts.total;
    document.getElementById("statPending").textContent = counts.pending;
    document.getElementById("statProgress").textContent = counts.progress;
    document.getElementById("statDone").textContent = counts.done;

    if (!jobs.length) {
      body.innerHTML = '<tr><td colspan="7" class="text-center text-secondary py-4">No jobs yet.</td></tr>';
      return;
    }
    body.innerHTML = jobs
      .map(
        (b) => `
        <tr>
          <td>${b.id}</td>
          <td>#${b.serviceId}</td>
          <td>${b.bookingDate || ""}</td>
          <td class="text-truncate" style="max-width:200px;">${b.address || ""}</td>
          <td>Rs.${b.totalAmount ?? ""}</td>
          <td>${statusBadge(b.status)}</td>
          <td>${nextAction(b)}</td>
        </tr>`
      )
      .join("");
  } catch (err) {
    body.innerHTML = `<tr><td colspan="7" class="text-danger text-center py-4">${err.message}</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  currentUser = session.requireRole("provider");
  if (!currentUser) return;

  document.getElementById("userName").textContent = currentUser.name;
  document.getElementById("logoutBtn").addEventListener("click", () => {
    session.clear();
    window.location.href = "index.html";
  });

  loadJobs();
});
