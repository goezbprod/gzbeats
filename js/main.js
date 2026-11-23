document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-section]");
  const views = document.querySelectorAll(".view");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("data-section");
      const targetView = document.getElementById(targetId);

      if (!targetView) return;

      event.preventDefault();
      views.forEach((view) => view.classList.remove("active"));
      targetView.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});