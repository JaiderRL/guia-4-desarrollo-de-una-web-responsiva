/* =========================================================
   Fogón Criollo · Interacciones
   1. Menú hamburguesa adaptable
   2. Sombra del encabezado y enlace activo al hacer scroll
   3. Filtro de categorías del menú
   4. Tarjetas desplegables ("Ver detalles")
   5. Validación del formulario de reservas
   6. Botón "volver arriba"
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  const navLinks = nav.querySelectorAll("a");

  /* ---------- 1. Menú hamburguesa ---------- */
  const closeMenu = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
  };

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  // Al elegir una opción el menú se cierra
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  // Cerrar con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Si la pantalla crece a escritorio, se reinicia el estado del menú
  window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });

  /* ---------- 2. Scroll: sombra, enlace activo y botón arriba ---------- */
  const toTop = document.getElementById("toTop");
  const sections = document.querySelectorAll("main section[id]");
  const menuLinks = document.querySelectorAll(".nav__link");

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 10);
    toTop.hidden = y < 500;

    let current = "inicio";
    sections.forEach((sec) => {
      if (y >= sec.offsetTop - 120) current = sec.id;
    });
    menuLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- 3. Filtro del menú ---------- */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll("#menuGrid .card");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.filter;

      filters.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });

      cards.forEach((card) => {
        const show = category === "todos" || card.dataset.category === category;
        card.hidden = !show;
      });
    });
  });

  /* ---------- 4. Tarjetas desplegables ---------- */
  document.querySelectorAll(".card__more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const extra = btn.nextElementSibling;
      const open = extra.hidden;
      extra.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Ocultar detalles" : "Ver detalles";
    });
  });

  /* ---------- 5. Formulario de reservas ---------- */
  const form = document.getElementById("reservaForm");
  const success = document.getElementById("formSuccess");
  const fecha = document.getElementById("fecha");

  // La fecha mínima es hoy
  const hoy = new Date();
  hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  fecha.min = hoy.toISOString().split("T")[0];

  const messages = {
    nombre: "Escribe tu nombre (mínimo 3 letras).",
    correo: "Escribe un correo válido, por ejemplo ana@correo.com.",
    fecha: "Elige una fecha desde hoy en adelante.",
    hora: "Selecciona una hora.",
    personas: "Indica entre 1 y 10 personas.",
  };

  const validateField = (field) => {
    const error = field.parentElement.querySelector(".form__error");
    const valid = field.checkValidity();
    field.classList.toggle("is-invalid", !valid);
    field.setAttribute("aria-invalid", String(!valid));
    if (error) error.textContent = valid ? "" : messages[field.name] || "Revisa este campo.";
    return valid;
  };

  const fields = form.querySelectorAll("input[required], select[required]");
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      success.hidden = true;
      form.querySelector(".is-invalid").focus();
      return;
    }

    const data = new FormData(form);
    const fechaTexto = new Date(`${data.get("fecha")}T00:00`).toLocaleDateString("es-CO", {
      weekday: "long", day: "numeric", month: "long",
    });
    success.textContent = `¡Listo, ${data.get("nombre").split(" ")[0]}! Reservamos una mesa para ${data.get("personas")} el ${fechaTexto} a las ${data.get("hora")}. Te enviaremos la confirmación a ${data.get("correo")}.`;
    success.hidden = false;
    form.reset();
    fields.forEach((f) => f.classList.remove("is-invalid"));
  });

  /* ---------- Año actual en el pie de página ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
