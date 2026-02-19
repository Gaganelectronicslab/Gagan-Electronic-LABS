/* ======================================================
   SAFE GLOBAL UTILITIES
====================================================== */
function $(id) {
  return document.getElementById(id);
}

/* ======================================================
   PROJECT FILTER (Projects Page)
====================================================== */
window.filterProjects = function (type) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.style.display =
      type === "all" || card.classList.contains(type)
        ? "block"
        : "none";
  });
};

/* ======================================================
   NAVBAR SHADOW (All Pages)
====================================================== */
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    header.style.boxShadow =
      window.scrollY > 20 ? "0 5px 15px rgba(0,0,0,.2)" : "none";
  }
});

/* ======================================================
   DARK MODE (Optional)
====================================================== */
const darkToggle = $("darkToggle");
if (darkToggle) {
  if (localStorage.theme === "dark") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️";
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.theme =
      document.body.classList.contains("dark") ? "dark" : "light";
    darkToggle.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

/* ======================================================
   CONTACT FORM SUCCESS (Contact Page)
====================================================== */
const contactForm = $("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", () => {
    setTimeout(() => {
      const msg = document.querySelector(".success-message");
      if (msg) msg.style.display = "block";
      contactForm.reset();
    }, 800);
  });
}

/* ======================================================
   CUSTOMIZE PAGE LOGIC (NO FILE UPLOAD)
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const customForm = $("customForm");
  if (!customForm) return; // ✅ Only run on customize page

  const projectType = $("projectType");
  const gramsBox = $("gramsBox");
  const fixedCostBox = $("fixedCostBox");
  const gramsInput = $("grams");
  const totalCost = $("totalCost");
  const estimatedField = $("estimatedCostField");

  /* ================= PRICE LOGIC ================= */
  window.handleProjectType = function () {
    const type = projectType.value;

    if (type === "3D Printing") {
      gramsBox.style.display = "flex";
      fixedCostBox.style.display = "none";
      totalCost.innerText = "50";
      estimatedField.value = "₹50 (Base Service Charge)";
    } else if (type) {
      gramsBox.style.display = "none";
      fixedCostBox.style.display = "block";
      totalCost.innerText = "1500";
      estimatedField.value = "₹1500 – ₹3000 (After Review)";
    } else {
      gramsBox.style.display = "none";
      fixedCostBox.style.display = "none";
      totalCost.innerText = "0";
      estimatedField.value = "₹0";
    }
  };

  window.calculateCost = function () {
    const grams = gramsInput.value || 0;
    const cost = grams * 10 + 50;
    totalCost.innerText = cost;
    estimatedField.value = "₹" + cost;
  };

  /* ================= FORM SUBMIT =================
     (Formspree handles everything)
  ================================================= */
  customForm.addEventListener("submit", () => {
    // No JS interception needed
    // Let Formspree submit naturally
  });
});
