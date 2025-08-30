// Seleccionamos todos los enlaces del nav
const links = document.querySelectorAll("nav a");

links.forEach(link => {

  link.addEventListener("click", function() {
    // Quitamos la clase 'active' de todos

    links.forEach(l => l.classList.remove("active"));
    // Agregamos 'active' solo al que se clicó

    this.classList.add("active");
  });

});
