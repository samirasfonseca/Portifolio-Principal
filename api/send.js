import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nome, email, mensagem } = req.body;

  
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,   
      to: process.env.EMAIL_USER,     
      replyTo: email,                 
      subject: `Nova mensagem de ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Mensagem enviada com sucesso! 🚀" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao enviar mensagem 😢" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }
}
