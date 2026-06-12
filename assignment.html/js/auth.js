function getUsers() {
  return JSON.parse(localStorage.getItem('ahpu_users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('ahpu_users', JSON.stringify(users));
}

function setSession(user, remember = false) {
  localStorage.setItem('ahpu_session', JSON.stringify(user));
  if (remember) {
    localStorage.setItem('ahpu_remember', JSON.stringify(user));
  }
}

function clearSession() {
  localStorage.removeItem('ahpu_session');
}

function getSession() {
  return JSON.parse(localStorage.getItem('ahpu_session') || localStorage.getItem('ahpu_remember') || 'null');
}

function validateEmail(email) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}

function registerAccount(event) {
  event.preventDefault();
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const feedback = document.getElementById('authFeedback');

  if (!fullName || !email || !password || !confirmPassword) {
    feedback.textContent = 'Fill in every required field.';
    return;
  }
  if (!validateEmail(email)) {
    feedback.textContent = 'Enter a valid email address.';
    return;
  }
  if (password.length < 8) {
    feedback.textContent = 'Password must be at least 8 characters.';
    return;
  }
  if (password !== confirmPassword) {
    feedback.textContent = 'Passwords do not match.';
    return;
  }

  const users = getUsers();
  if (users.some(user => user.email === email)) {
    feedback.textContent = 'An account with that email already exists.';
    return;
  }

  users.push({ fullName, email, password });
  saveUsers(users);
  setSession({ fullName, email });
  window.location.href = 'dashboard.html';
}

function togglePassword(id, toggleId) {
  const input = document.getElementById(id);
  const toggle = document.getElementById(toggleId);
  if (input.type === 'password') {
    input.type = 'text';
    toggle.textContent = 'Hide';
  } else {
    input.type = 'password';
    toggle.textContent = 'Show';
  }
}

function loginAccount(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const remember = document.getElementById('rememberMe').checked;
  const feedback = document.getElementById('authFeedback');

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    feedback.textContent = 'Invalid email or password.';
    return;
  }
  setSession(user, remember);
  window.location.href = 'dashboard.html';
}

function initAuthPage() {
  if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', registerAccount);
  }
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', loginAccount);
    document.getElementById('toggleLoginPassword')?.addEventListener('click', () => togglePassword('loginPassword', 'toggleLoginPassword'));
    document.getElementById('togglePassword')?.addEventListener('click', () => togglePassword('password', 'togglePassword'));
    document.getElementById('toggleConfirmPassword')?.addEventListener('click', () => togglePassword('confirmPassword', 'toggleConfirmPassword'));
  }
}

document.addEventListener('DOMContentLoaded', initAuthPage);
