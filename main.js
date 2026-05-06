const coworkingsData = [
  {
    id: 1, name: "Теплый Офис", address: "ул. Ленина, 25, Чита", price: "200 ₽/час",
    description: "Уютное пространство с живыми растениями и натуральным светом. Идеально для фрилансеров и небольших команд.",
    worktime: "Пн-Пт: 09:00-21:00, Сб-Вс: 10:00-20:00", amenities: "Wi-Fi, кухня, зона отдыха, парковка",
    image: "images/coworking1.jpg"
  },
  {
    id: 2, name: "Природа Work", address: "ул. Амурская, 10, Чита", price: "300 ₽/час",
    description: "Вид на городской парк, тишина и зона отдыха с зелёной стеной.",
    worktime: "Пн-Вс: 08:00-22:00", amenities: "Wi-Fi, веранда, кофе-поинт, шкафчики",
    image: "images/coworking2.jpg"
  },
  {
    id: 3, name: "GreenHub", address: "ул. Бабушкина, 42, Чита", price: "250 ₽/час",
    description: "Эко-коворкинг с террасой и фито-лампами. Проводятся воркшопы.",
    worktime: "Пн-Пт: 09:00-20:00, Сб: 10:00-18:00", amenities: "Wi-Fi, терраса, конференц-зона, вегетарианский буфет",
    image: "images/coworking3.jpg"
  },
  {
    id: 4, name: "Чита Коворкинг", address: "ул. Бутина, 15, Чита", price: "180 ₽/час",
    description: "Для стартапов и фрилансеров, дружелюбная атмосфера, есть переговорные комнаты.",
    worktime: "Пн-Вс: 09:00-23:00", amenities: "Wi-Fi, переговорки, кулер, принтер",
    image: "images/coworking4.jpg"
  },
  {
    id: 5, name: "Забайкальский Коворкинг", address: "проспект Фадеева, 1, Чита", price: "220 ₽/час",
    description: "Просторный зал с панорамными окнами, столы-трансформеры, живой уголок.",
    worktime: "Пн-Вс: 08:00-20:00", amenities: "Wi-Fi, зона для детей, кухня, лаунж",
    image: "images/coworking5.jpg"
  },
  {
    id: 6, name: "WoodSpace", address: "ул. Лазо, 54, Чита", price: "270 ₽/час",
    description: "Интерьер из натурального дерева, тихий центр, подходит для консалтинга.",
    worktime: "Пн-Пт: 10:00-19:00", amenities: "Wi-Fi, отдельные кабинеты, парковка, переговорная",
    image: "images/coworking6.jpg"
  },
  {
    id: 7, name: "Coworking Park", address: "микрорайон Северный, 8, Чита", price: "190 ₽/час",
    description: "Рядом с парком, много света, есть терраса и велопарковка.",
    worktime: "Пн-Вс: 09:00-21:00", amenities: "Wi-Fi, велопарковка, кофе, зона для медитации",
    image: "images/coworking7.jpg"
  },
  {
    id: 8, name: "Тихий Сад", address: "ул. Новобульварная, 12, Чита", price: "240 ₽/час",
    description: "Коворкинг в здании с внутренним двориком, где можно работать на свежем воздухе.",
    worktime: "Пн-Сб: 10:00-22:00, Вс выходной", amenities: "Wi-Fi, внутренний дворик, настольные игры, чайная станция",
    image: "images/coworking8.jpg"
  },
  {
    id: 9, name: "Эко-Платформа", address: "ул. Чкалова, 12, Чита", price: "210 ₽/час",
    description: "Новое пространство с панорамными окнами и зелёной крышей. Открыто в 2025 году.",
    worktime: "Пн-Вс: 09:00-21:00", amenities: "Wi-Fi, терраса на крыше, веган-кафе, зона для йоги",
    image: "images/coworking9.jpg"
  }
];

const USERS_KEY = "greenwork_users";
const CURRENT_USER_KEY = "greenwork_current_user";
const ADMIN_SESSION_KEY = "greenwork_admin_logged_in";

function initUsers() {
  let users = localStorage.getItem(USERS_KEY);
  if (!users) {
    const defaultUsers = [
      { id: 1, email: "user@example.com", password: "123456", firstName: "Иван", lastName: "Петров", phone: "+7 999 111-22-33", avatar: "", favorites: [] }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function isUserLoggedIn() {
  return sessionStorage.getItem(CURRENT_USER_KEY) !== null;
}

function getCurrentUser() {
  const userId = sessionStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return null;
  const users = getUsers();
  return users.find(u => u.id == userId) || null;
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    sessionStorage.setItem(CURRENT_USER_KEY, user.id);
    return true;
  }
  return false;
}

function registerUser(email, password, firstName, lastName, phone, avatarBase64 = "") {
  const users = getUsers();
  if (users.some(u => u.email === email)) return false;
  const newId = Date.now();
  const newUser = {
    id: newId,
    email, password, firstName, lastName, phone,
    avatar: avatarBase64,
    favorites: []
  };
  users.push(newUser);
  saveUsers(users);
  sessionStorage.setItem(CURRENT_USER_KEY, newId);
  return true;
}

function updateUserProfile(userId, updates) {
  const users = getUsers();
  const index = users.findIndex(u => u.id == userId);
  if (index !== -1) {
    Object.assign(users[index], updates);
    saveUsers(users);
  }
}

function toggleFavorite(userId, coworkingId) {
  const users = getUsers();
  const user = users.find(u => u.id == userId);
  if (!user) return false;
  const favIndex = user.favorites.indexOf(coworkingId);
  if (favIndex === -1) {
    user.favorites.push(coworkingId);
  } else {
    user.favorites.splice(favIndex, 1);
  }
  saveUsers(users);
  return true;
}

function isFavorite(userId, coworkingId) {
  const users = getUsers();
  const user = users.find(u => u.id == userId);
  return user ? user.favorites.includes(coworkingId) : false;
}

function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function adminLogin(password) {
  if (password === "admin111") {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = "index.html";
}

function getApplications() {
  const stored = localStorage.getItem("coworking_applications");
  return stored ? JSON.parse(stored) : [];
}

function saveApplications(apps) {
  localStorage.setItem("coworking_applications", JSON.stringify(apps));
}

function addApplication(name, phone, email, coworkingId, comment) {
  const apps = getApplications();
  const cowork = coworkingsData.find(c => c.id == coworkingId);
  const newApp = {
    id: Date.now(), name, phone, email,
    coworkingId: parseInt(coworkingId), coworkingName: cowork ? cowork.name : "Неизвестно",
    comment: comment || "", date: new Date().toLocaleString("ru-RU")
  };
  apps.push(newApp);
  saveApplications(apps);
  return true;
}

function populateCoworkingSelect(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = '<option value="">Выберите коворкинг</option>';
  coworkingsData.forEach(cw => {
    const option = document.createElement("option");
    option.value = cw.id;
    option.textContent = `${cw.name} (${cw.price})`;
    select.appendChild(option);
  });
}

function setupModal() {
  const modal = document.getElementById("feedbackModal");
  const floatingBtn = document.getElementById("floatingBtn");
  const closeModal = document.querySelector(".close-modal");
  const form = document.getElementById("feedbackForm");
  if (!modal || !floatingBtn) return;
  floatingBtn.onclick = () => {
    modal.style.display = "flex";
    populateCoworkingSelect("coworkingSelect");
  };
  if (closeModal) closeModal.onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("fbName").value.trim();
      const phone = document.getElementById("fbPhone").value.trim();
      const email = document.getElementById("fbEmail").value.trim();
      const coworkingId = document.getElementById("coworkingSelect").value;
      const comment = document.getElementById("fbComment").value;
      if (!name || !phone || !email || !coworkingId) {
        alert("Заполните имя, телефон, email и выберите коворкинг");
        return;
      }
      if (!email.includes("@")) { alert("Введите корректный email"); return; }
      addApplication(name, phone, email, coworkingId, comment);
      alert("Заявка отправлена! Спасибо.");
      form.reset();
      modal.style.display = "none";
    };
  }
}

function renderCoworkingsCards(containerId = "coworkingsGrid", showFavBtn = true) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  const user = getCurrentUser();
  const userId = user ? user.id : null;
  coworkingsData.forEach(cw => {
    const isFav = userId ? isFavorite(userId, cw.id) : false;
    const card = document.createElement("div");
    card.className = "cowork-card";
    card.innerHTML = `
      <div class="card-img" style="background-image: url('${cw.image}');"></div>
      <div class="card-content">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3>${cw.name}</h3>
          ${showFavBtn ? `<button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${cw.id}">♥</button>` : ''}
        </div>
        <div class="address">${cw.address}</div>
        <div class="worktime">${cw.worktime}</div>
        <div class="amenities">Удобства: ${cw.amenities}</div>
        <div class="price">${cw.price}</div>
        <p>${cw.description}</p>
        <button class="btn-outline request-btn" data-id="${cw.id}" style="margin-top: 12px;">Оставить заявку</button>
      </div>
    `;
    container.appendChild(card);
  });
  document.querySelectorAll(".request-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const coworkId = btn.getAttribute("data-id");
      const modal = document.getElementById("feedbackModal");
      if (modal) {
        populateCoworkingSelect("coworkingSelect");
        const select = document.getElementById("coworkingSelect");
        if (select) select.value = coworkId;
        modal.style.display = "flex";
      }
    });
  });
  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const userCurr = getCurrentUser();
      if (!userCurr) {
        alert("Чтобы добавлять в избранное, войдите в профиль.");
        window.location.href = "login.html";
        return;
      }
      const coworkId = parseInt(btn.getAttribute("data-id"));
      toggleFavorite(userCurr.id, coworkId);
      const isNowFav = isFavorite(userCurr.id, coworkId);
      if (isNowFav) btn.classList.add("active");
      else btn.classList.remove("active");
    });
  });
}

function renderHomePreview() {
  const container = document.getElementById("homeCoworkingsPreview");
  if (!container) return;
  container.innerHTML = "";
  const preview = coworkingsData.slice(0, 3);
  const user = getCurrentUser();
  const userId = user ? user.id : null;
  preview.forEach(cw => {
    const isFav = userId ? isFavorite(userId, cw.id) : false;
    const card = document.createElement("div");
    card.className = "cowork-card";
    card.innerHTML = `
      <div class="card-img" style="background-image: url('${cw.image}');"></div>
      <div class="card-content">
        <div style="display: flex; justify-content: space-between;">
          <h3>${cw.name}</h3>
          <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${cw.id}">♥</button>
        </div>
        <div class="price">${cw.price}</div>
        <p>${cw.address}</p>
        <button class="btn-outline home-request-btn" data-id="${cw.id}">Заявка</button>
      </div>
    `;
    container.appendChild(card);
  });
  document.querySelectorAll("#homeCoworkingsPreview .favorite-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const userCurr = getCurrentUser();
      if (!userCurr) { alert("Войдите в профиль"); window.location.href = "login.html"; return; }
      const coworkId = parseInt(btn.getAttribute("data-id"));
      toggleFavorite(userCurr.id, coworkId);
      const isNowFav = isFavorite(userCurr.id, coworkId);
      if (isNowFav) btn.classList.add("active");
      else btn.classList.remove("active");
    });
  });
  document.querySelectorAll("#homeCoworkingsPreview .home-request-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const coworkId = btn.getAttribute("data-id");
      const modal = document.getElementById("feedbackModal");
      if (modal) {
        populateCoworkingSelect("coworkingSelect");
        const select = document.getElementById("coworkingSelect");
        if (select) select.value = coworkId;
        modal.style.display = "flex";
      }
    });
  });
}

function updateHeaderAuthLink() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  const existingAuthLink = document.getElementById("authNavLink");
  if (existingAuthLink) existingAuthLink.remove();
  const existingLogout = document.getElementById("logoutNavLink");
  if (existingLogout) existingLogout.remove();
  
  const authLink = document.createElement("a");
  authLink.id = "authNavLink";
  if (isAdminLoggedIn()) {
    authLink.href = "applications.html";
    authLink.textContent = "Заявки";
  } else if (isUserLoggedIn()) {
    authLink.href = "profile.html";
    authLink.textContent = "Профиль";
  } else {
    authLink.href = "login.html";
    authLink.textContent = "Вход";
  }
  nav.appendChild(authLink);
  
  if (isUserLoggedIn() || isAdminLoggedIn()) {
    const logoutLink = document.createElement("a");
    logoutLink.id = "logoutNavLink";
    logoutLink.href = "#";
    logoutLink.textContent = "Выйти";
    logoutLink.style.marginLeft = "10px";
    logoutLink.onclick = (e) => {
      e.preventDefault();
      logout();
    };
    nav.appendChild(logoutLink);
  }
}

function setActiveNav() {
  const path = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html") || (path === "index.html" && href === "index.html")) {
      link.classList.add("active");
    } else if (path === "" && href === "index.html") {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initUsers();
  setupModal();
  if (window.location.pathname.includes("coworkings.html")) {
    renderCoworkingsCards("coworkingsGrid", true);
  }
  if (window.location.pathname.includes("index.html") || window.location.pathname === "/" || window.location.pathname === "") {
    renderHomePreview();
  }
  updateHeaderAuthLink();
  setActiveNav();
});