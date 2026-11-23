
document.addEventListener("DOMContentLoaded", () => {

  const header = document.getElementById("main-header");

  const lightSection = document.getElementById("beat-promo");

  if (!header || !lightSection) return;


  function updateHeaderTheme() {

    const headerBottom = header.getBoundingClientRect().bottom;

    const sectionTop = lightSection.getBoundingClientRect().top;

    const isOverLightSection = sectionTop < headerBottom;

    header.classList.toggle(
      "topbar--light",
      isOverLightSection
    );

  }


  // Detectar desplazamiento
  window.addEventListener(
    "scroll",
    updateHeaderTheme,
    { passive: true }
  );


  // Detectar cambios de tamaño
  window.addEventListener(
    "resize",
    updateHeaderTheme
  );


  // Establecer apariencia inicial
  updateHeaderTheme();

});
