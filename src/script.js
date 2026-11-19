const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealTargets = document.querySelectorAll(
  ".project-card, .service-card, .resume-project, .timeline-item, .process-step, .resume-section, .contact-grid, .details-grid",
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = [...revealTargets].indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.max(index % 6, 0) * 55}ms`;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const finePointer = window.matchMedia("(pointer: fine)").matches;
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (finePointer && !reducedMotion) {
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty(
      "--cursor-x",
      `${event.clientX}px`,
    );
    document.documentElement.style.setProperty(
      "--cursor-y",
      `${event.clientY}px`,
    );
  });

  const tiltTargets = document.querySelectorAll(
    ".project-card, .service-card, .profile-image",
  );

  tiltTargets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
    });

    target.addEventListener("pointerleave", () => {
      target.style.transform = "";
    });
  });
}
