function showAlert(message, type = "danger") {
  const el = document.getElementById("alert");
  el.className = `alert alert-${type}`;
  el.textContent = message;
}

function preselectType() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (type && document.getElementById("userType")) {
    document.getElementById("userType").value = type;
  }
}

function dashboardFor(userType) {
  return userType === "provider" ? "dashboard-provider.html" : "dashboard-customer.html";
}

function initSignin() {
  preselectType();
  document.getElementById("signinForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      userType: document.getElementById("userType").value,
    };
    try {
      const data = await api.login(payload);
      session.set(data.user);
      window.location.href = dashboardFor(data.user.user_type);
    } catch (err) {
      showAlert(err.message);
    }
  });
}

function initSignup() {
  preselectType();
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      password: document.getElementById("password").value,
      userType: document.getElementById("userType").value,
    };
    try {
      await api.register(payload);
      showAlert("Account created! Redirecting to sign in...", "success");
      setTimeout(() => (window.location.href = `signin.html?type=${payload.userType}`), 1200);
    } catch (err) {
      showAlert(err.message);
    }
  });
}
