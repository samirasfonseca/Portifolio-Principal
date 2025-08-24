require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // se tiver arquivos do front-end

// Rota do formulário
app.post("/send", (req, res) => {
  const { nome, email, mensagem } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

let mailOptions = {
  from: process.env.EMAIL_USER,      
  to: process.env.EMAIL_USER,        
  replyTo: email,                    
  subject: `Nova mensagem de ${nome}`,
  text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
};


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Erro ao enviar mensagem 😢");
    } else {
      console.log("Email enviado: " + info.response);
      res.send("Mensagem enviada com sucesso! 🚀");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/*------------------------------- Menu Hmaburguer -----------------------------------------*/
  function toggleMenu() {
    // só funciona se a largura da tela for menor que 768px
    if (window.innerWidth <= 768) {
      const menu = document.getElementById("navbar").classList.toggle("active");
    }
  }

/*------------------------------- Mover o Carrossel Projetos -----------------------------------------*/

  function scrollCarousel(direction) {
    const carousel = document.getElementById("carousel");
    const cardWidth = carousel.querySelector(".Projetos__conteudos").offsetWidth + 32; // largura + gap
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth"
    });
  }