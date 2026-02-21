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

// ── TOGGLE TEMA CLARO / OSCURO ──
const btnTema = document.getElementById("btnTema");
const root    = document.documentElement;

const temaGuardado = localStorage.getItem("tema");
if (temaGuardado === "light") {
  root.classList.add("light");
  btnTema.textContent = "🌙";
} else {
  btnTema.textContent = "☀️";
}

btnTema.addEventListener("click", () => {
  root.classList.toggle("light");
  const esClaro = root.classList.contains("light");
  btnTema.textContent = esClaro ? "🌙" : "☀️";
  localStorage.setItem("tema", esClaro ? "light" : "dark");
});
