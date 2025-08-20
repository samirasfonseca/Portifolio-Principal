require('dotenv').config(); // <- Adicione esta linha no topo do arquivo
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
     <form action="/send" method="post">
        <h3>Entre em contato</h3>
        <input type="text" name="nome" placeholder="Digite seu nome" required>
        <input type="email" name="email" placeholder="Digite seu Email" required>
        <textarea name="mensagem" placeholder="Digite sua mensagem" required></textarea>
        <button type="submit">Enviar</button>
     </form>
  `);
});

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
    subject: `Nova mensagem de ${nome}`,
    text: mensagem,
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
