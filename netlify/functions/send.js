require("dotenv").config();
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  const timestamp = new Date().toISOString();

  // Configurar cabeçalhos CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Lidar com requisições OPTIONS (preflight)
  if (event.httpMethod === "OPTIONS") {
    console.log(`[${timestamp}] Respondendo a requisição OPTIONS`);
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Verificar se é uma requisição POST
  if (event.httpMethod !== "POST") {
    console.log(`[${timestamp}] Método não permitido: ${event.httpMethod}`);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Método não permitido", timestamp }),
    };
  }

  // Parsear os dados do formulário
  let body;
  try {
    body = require("querystring").parse(event.body); // Apenas urlencoded, conforme o formulário
  } catch (urlError) {
    console.error(`[${timestamp}] Erro ao parsear urlencoded:`, urlError);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Formato de dados inválido", timestamp }),
    };
  }

  const { name, email, message } = body;

  // Validar entradas
  if (!name || !email || !message) {
    console.log(`[${timestamp}] Campos ausentes:`, { name, email, message });
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Todos os campos são obrigatórios", timestamp }),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log(`[${timestamp}] E-mail inválido: ${email}`);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Por favor, insira um e-mail válido", timestamp }),
    };
  }

  // Configurar Nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    cc: "augustogab12@gmail.com", // Substituído por um e-mail válido
    replyTo: email,
    subject: `Nova mensagem de ${name} - ${new Date().toLocaleString("pt-BR")}`,
    text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
    encoding: "utf-8",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[${timestamp}] E-mail enviado com sucesso:`, info.response);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Mensagem enviada com sucesso!", timestamp }),
    };
  } catch (error) {
    console.error(`[${timestamp}] Erro ao enviar e-mail:`, error.message, error.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Falha ao enviar a mensagem: ${error.message}`, timestamp }),
    };
  }
};