// public/script.js

let jwtToken = "";
let role = "";

async function register() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-pass").value;
  const role = document.getElementById("reg-role").value;

  const res = await fetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await res.json();
  alert(data.message || data.error);
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-pass").value;

  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  alert(data.message || data.error);
}

async function verifyOtp() {
  const email = document.getElementById("otp-email").value;
  const otp = document.getElementById("otp-code").value;

  const res = await fetch("/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (data.token) {
    jwtToken = data.token;
    role = data.role;

    document.getElementById("dashboard").style.display = "block";
    document.getElementById("dashboard-text").innerText =
      `Hello ${role.toUpperCase()}! You are now logged in 🎉`;
  } else {
    alert(data.error || "OTP Failed");
  }
}

async function checkUserRoute() {
  const res = await fetch("/protected/user", {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });

  const data = await res.json();
  alert(data.message || data.error);
}

async function checkAdminRoute() {
  const res = await fetch("/protected/admin", {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });

  const data = await res.json();
  alert(data.message || data.error);
}
