import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
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

    try {
      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Nova mensagem de ${nome}`,
        text: mensagem,
      });
      res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Erro ao enviar mensagem" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
