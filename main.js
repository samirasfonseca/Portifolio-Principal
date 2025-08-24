/*------------------------------- Menu Haburguer -----------------------------------------*/
const hamburger = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('active');
      console.log("Clique no hambúrguer!"); // debug
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

/*------------------------------- Formulario de Contato -----------------------------------------*/
    const form = document.getElementById("form-contato");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);
  });


/*------------------------------- -----------------------------------------*/

