
import { API } from "../../../endpoints.js";

export async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch(API.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "index.html"; // redirect after login
  } else {
    alert(data.message || "Login failed");
  }
}

export async function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  console.log("payload for sign up: ", {username, email, password});
  const res = await fetch(API.SIGNUP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "login.html"; // redirect after signup
  } else {
    alert(data.message || "Signup failed");
  }
}

export function isUserLoggedIn() {
  return !!localStorage.getItem("user");
}

export function logout() {
  localStorage.removeItem("user");
  window.location.reload();
}
