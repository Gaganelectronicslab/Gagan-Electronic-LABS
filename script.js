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
   PROJECT FILTER – ACTIVE BUTTON UX
====================================================== */
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filters button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
  });
});

/* ======================================================
   NAVBAR SHADOW
====================================================== */
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    header.style.boxShadow =
      window.scrollY > 20 ? "0 5px 15px rgba(0,0,0,.2)" : "none";
  }
});

/* ======================================================
   PRICE COUNTER ANIMATION
====================================================== */
function animatePrice(el, from, to, duration = 400) {
  if (!el) return;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.innerText = Math.round(from + (to - from) * progress);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ======================================================
   CUSTOMIZE PAGE LOGIC (FINAL – FIXED & CLEAN)
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const customForm = $("customForm");
  if (!customForm) return;

  const projectType = $("projectType");
  const gramsBox = $("gramsBox");
  const fixedCostBox = $("fixedCostBox");
  const gramsInput = $("grams");
  const totalCost = $("totalCost");
  const estimatedField = $("estimatedCostField");

  const driveInput = $("driveLinkInput");
  const driveTick = $("driveTick");
  const submitBtn = $("submitBtn");
  const successSound = $("driveSuccessSound");

  /* ================= PROJECT TYPE ================= */
  window.handleProjectType = function () {
    const type = projectType.value;
    const current = Number(totalCost.innerText) || 0;

    if (type === "3D Printing") {
      gramsBox.style.display = "flex";
      fixedCostBox.style.display = "none";

      animatePrice(totalCost, current, 50);
      estimatedField.value = "₹50 (Base Service Charge)";
      gramsInput.value = "";
    }
    else if (type) {
      gramsBox.style.display = "none";
      fixedCostBox.style.display = "block";

      animatePrice(totalCost, current, 1500);
      estimatedField.value = "₹1500 – ₹3000 (After Review)";
    }
    else {
      gramsBox.style.display = "none";
      fixedCostBox.style.display = "none";

      animatePrice(totalCost, current, 0);
      estimatedField.value = "₹0";
    }
  };

  /* ================= LIVE GRAMS PRICING (REAL FIX) ================= */
  gramsInput.addEventListener("input", () => {
    if (projectType.value !== "3D Printing") return;

    const grams = Number(gramsInput.value);
    const current = Number(totalCost.innerText) || 50;

    if (!grams || grams <= 0) {
      animatePrice(totalCost, current, 50);
      estimatedField.value = "₹50 (Base Service Charge)";
      return;
    }

    const cost = grams * 10 + 50;
    animatePrice(totalCost, current, cost);
    estimatedField.value = "₹" + cost;
  });

  /* ================= DRIVE LINK VALIDATION + TICK + SOUND ================= */
  submitBtn.disabled = true;

  const DRIVE_REGEX =
    /^https?:\/\/drive\.google\.com\/(file\/d\/|drive\/folders\/).+/;

  let soundPlayed = false;

  driveInput.addEventListener("input", () => {
    const value = driveInput.value.trim();

    if (DRIVE_REGEX.test(value)) {
      driveInput.classList.add("drive-valid");
      driveInput.classList.remove("drive-invalid");

      driveTick.style.display = "block";
      driveTick.play();

      if (!soundPlayed && successSound) {
        successSound.currentTime = 0;
        successSound.play().catch(() => {});
        soundPlayed = true;
      }

      submitBtn.disabled = false;
    } else {
      driveInput.classList.remove("drive-valid");
      driveInput.classList.add("drive-invalid");

      driveTick.style.display = "none";
      submitBtn.disabled = true;
      soundPlayed = false;
    }
  });
});
