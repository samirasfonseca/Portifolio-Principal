/*------------------------------- Menu Haburguer -----------------------------------------*/
const toggleBtn = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

toggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

/*------------------------------- Mover o Carrossel Projetos -----------------------------------------*/

  function scrollCarousel(direction) {
    const carousel = document.getElementById("carousel");
    const cardWidth = carousel.querySelector(".Projetos__conteudos").offsetWidth + 32; // largura + gap
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth"
    });
  }



