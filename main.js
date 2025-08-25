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

/*------------------------------- Formulario de Contato -----------------------------------------*/
document.getElementById("form-contato").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: e.target.nome.value,
    email: e.target.email.value,
    mensagem: e.target.mensagem.value
  };

  const res = await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    alert("Mensagem enviada com sucesso!");
    e.target.reset();
  } else {
    alert("Erro ao enviar mensagem!");
  }
});



/*------------------------------- -----------------------------------------*/

