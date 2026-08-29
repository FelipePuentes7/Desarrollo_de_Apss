
const titulo = document.getElementById("titulo");
const boton = document.getElementById("miBoton");

boton.addEventListener("click", function () {

  titulo.textContent = "¡Modificaste el DOM con éxito! 🎉";
  titulo.style.color = "#4f46e5";
});
