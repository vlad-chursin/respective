const popup = document.getElementById("popup");

function openPopup() {
  if (!popup) return;
  popup.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePopup() {
  if (!popup) return;
  popup.classList.remove("active");
  document.body.style.overflow = "";
}

const openBtn = document.getElementById("openPopup");
if (openBtn) openBtn.addEventListener("click", openPopup);

const openBtn2 = document.getElementById("openPopup-2");
if (openBtn2) openBtn2.addEventListener("click", openPopup);

if (popup) {
  const closeBtn = popup.querySelector(".close-popup");
  const overlay = popup.querySelector(".popup-overlay");

  if (closeBtn) closeBtn.addEventListener("click", closePopup);
  if (overlay) overlay.addEventListener("click", closePopup);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});

const nav = document.querySelector(".site-nav");
const burger = document.getElementById("burger");
const menu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("menuClose");

function openMenu() {
  menu.classList.add("active");
  nav.classList.add("menu-open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menu.classList.remove("active");
  nav.classList.remove("menu-open");
  document.body.style.overflow = "";
}

burger.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

const parallaxItems = document.querySelectorAll("[data-parallax]");

document.addEventListener("mousemove", function (e) {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  parallaxItems.forEach(function (item) {
    const type = item.dataset.parallax;

    if (type === "image") {
      item.style.transform = "translate(" + x + "px, " + y + "px)";
    }

    if (type === "text") {
      item.style.transform = "translate(" + x * 0.5 + "px, " + y * 0.5 + "px)";
    }
  });
});

const titleImg = document.querySelector("[data-title-parallax]");

let offsetX = 0;
let offsetY = 0;

if (titleImg) {
  document.addEventListener("mousemove", function (e) {
    offsetX = (e.clientX / window.innerWidth - 0.5) * 1.4;
    offsetY = (e.clientY / window.innerHeight - 0.5) * 1.4;

    titleImg.style.transform =
      "translate3d(" + offsetX + "rem, " + offsetY + "rem, 0)";
  });

  document.addEventListener("mouseleave", function () {
    titleImg.style.transform = "translate3d(0, 0, 0)";
  });
}

const panels = document.querySelectorAll(".beta__panel");
const dots = document.querySelectorAll(".beta__controls .dot");
const nextButtons = document.querySelectorAll(".nextStep");
const progressFill = document.querySelector(".beta__progress-fill");

let current = 0;

function setStep(index) {
  if (index < 0) index = 0;
  if (index > panels.length - 1) index = panels.length - 1;

  current = index;

  panels.forEach((panel, i) => {
    panel.classList.toggle("is-active", i === current);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === current);
  });

  if (progressFill) {
    const percent = (current / (panels.length - 1)) * 100;
    progressFill.style.width = percent + "%";
  }
}

nextButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setStep(current + 1);
  });
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const go = Number(dot.dataset.go);
    setStep(go);
  });
});

setStep(0);

document.querySelectorAll(".btn-prev").forEach((btn) => {
  btn.addEventListener("click", () => {
    setStep(current - 1);
  });
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".button_bid_store[data-alert]");
  if (!btn) return;

  const message = btn.dataset.alert;

  alert(message);
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".button_bid_affiche[data-alert]");
  if (!btn) return;

  const message = btn.dataset.alert;

  alert(message);
});

const betaForm = document.getElementById("betaForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function hasRealChars(value) {
  const v = value.trim();
  if (!v) return false;

  return /[A-Za-zА-Яа-яЁё0-9]/.test(v);
}

function isValidEmail(value) {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function setFieldState(field, errorEl, message) {
  const isOk = message === "";

  field.classList.toggle("is-invalid", !isOk);
  field.classList.toggle("is-valid", isOk);

  errorEl.textContent = message;
}

function validateName() {
  const v = nameInput.value;

  if (!v.trim()) {
    setFieldState(nameInput, nameError, "Заполните имя.");
    return false;
  }
  if (v.trim().length < 2) {
    setFieldState(nameInput, nameError, "Имя слишком короткое.");
    return false;
  }
  if (!hasRealChars(v)) {
    setFieldState(
      nameInput,
      nameError,
      "Имя должно содержать буквы или цифры."
    );
    return false;
  }

  setFieldState(nameInput, nameError, "");
  return true;
}

function validateEmail() {
  const v = emailInput.value;

  if (!v.trim()) {
    setFieldState(emailInput, emailError, "Заполните почту.");
    return false;
  }
  if (!isValidEmail(v)) {
    setFieldState(
      emailInput,
      emailError,
      "Введите корректный email, например example@domain.com."
    );
    return false;
  }

  setFieldState(emailInput, emailError, "");
  return true;
}

function validateMessage() {
  const v = messageInput.value;

  if (!v.trim()) {
    setFieldState(messageInput, messageError, "Напишите пожелания.");
    return false;
  }
  if (v.trim().length < 5) {
    setFieldState(
      messageInput,
      messageError,
      "Слишком коротко, напишите чуть подробнее."
    );
    return false;
  }
  if (!hasRealChars(v)) {
    setFieldState(
      messageInput,
      messageError,
      "Текст должен содержать буквы или цифры."
    );
    return false;
  }

  setFieldState(messageInput, messageError, "");
  return true;
}

function validateAll() {
  const a = validateName();
  const b = validateEmail();
  const c = validateMessage();
  return a && b && c;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

betaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateAll()) {
    alert("Пожалуйста, корректно заполните все поля формы.");
    return;
  }

  alert("Учтем опыт\n" + "Внедрим вашу призму в каркас продукта");

  betaForm.reset();

  [nameInput, emailInput, messageInput].forEach((el) => {
    el.classList.remove("is-valid", "is-invalid");
  });

  [nameError, emailError, messageError].forEach((el) => {
    el.textContent = "";
  });

  closePopup();
});
