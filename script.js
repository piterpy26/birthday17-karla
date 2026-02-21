const musicaFondo = document.getElementById("musicaFondo");

// Intenta autoplay directo al cargar
window.addEventListener("load", () => {
  musicaFondo.volume = 1.0;
  musicaFondo.play().catch(() => {
    // El navegador lo bloqueó → espera el primer toque
    esperarInteraccion();
  });
});

// Fallback: primer toque en cualquier parte activa la música
function esperarInteraccion() {
  const activar = () => {
    musicaFondo.play().catch(() => {});
    document.removeEventListener("touchstart", activar);
    document.removeEventListener("click", activar);
  };

  document.addEventListener("touchstart", activar, { once: true });
  document.addEventListener("click",      activar, { once: true });
}
