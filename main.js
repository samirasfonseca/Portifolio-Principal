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
    from: email,
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
