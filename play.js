const reproductor = document.getElementById("my-video"),
  source = document.getElementById("my-source"),
  titulo = document.getElementById("titulo"),
  contenedorEnlaces = document.querySelectorAll(".temp"),
  enlaces = [...contenedorEnlaces],
  keyName = "nombreClave-1";
enlaces.forEach((e) => {
  e.addEventListener("click", (t) => {
    t.preventDefault();
    let r = e.getAttribute("href"),
      o = e.querySelector("img").getAttribute("src"),
      c = e.querySelector("h4").innerText;
    localStorage.setItem(keyName + "-url", r),
      localStorage.setItem(keyName + "-min", o),
      localStorage.setItem(keyName + "-titulo", c),
      localStorage.setItem(keyName + "-time", 0),
      window.scrollTo({ top: 0, behavior: "smooth" }),
      window.location.reload();
  });
});
const cargarReproductor = () => {
  source.setAttribute("src", localStorage.getItem(keyName + "-url")),
    reproductor.setAttribute("poster", localStorage.getItem(keyName + "-min")),
    (titulo.innerText = localStorage.getItem(keyName + "-titulo"));
};
null !== localStorage.getItem(keyName + "-url")
  ? cargarReproductor()
  : null == localStorage.getItem(keyName + "-url") &&
    source.setAttribute("src", enlaces[0].getAttribute("href"));
const actualTime = () => {
  0 != reproductor.currentTime &&
    localStorage.setItem(keyName + "-time", reproductor.currentTime);
};
setInterval(() => {
  actualTime();
}, 3e3);
const reproducir = () => {
  reproductor.currentTime = localStorage.getItem(keyName + "-time");
};
reproducir();
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
scrollToTop();
reproductor.autoplay = true;
