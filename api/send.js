import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body;

  try {
    // Configuração do transporter (use variáveis de ambiente no Vercel!)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // seu email
        pass: process.env.EMAIL_PASS  // sua senha de app do Gmail
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // você recebe aqui
      subject: `Novo contato de ${nome}`,
      text: mensagem,
    });

    return res.status(200).json({ success: true, message: "Email enviado!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}



