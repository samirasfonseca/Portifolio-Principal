import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // pode ser Gmail, Outlook etc.
      auth: {
        user: process.env.EMAIL_USER, // vai ficar salvo nas variáveis de ambiente
        pass: process.env.EMAIL_PASS, // senha de app
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nova mensagem de ${nome}`,
      text: mensagem,
    });

    res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar", error });
  }
}


