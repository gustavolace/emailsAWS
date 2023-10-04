const nodemailer = require ("nodemailer")

  const aniversariantes = [
    { nome: "João", email: "joao@exemplo", aniversario: "10-04" },
  ];

exports.handler = async (aniversariantes) => {

  
const smtp = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: Number(process.env.MAIL_SECURE),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
  
  smtp.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("A conexão com o servidor SMTP está funcionando corretamente.");
    }
  });
  
  
  function enviarEmailAniversario(nome, email) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Feliz Aniversário!",
      text: `Olá ${nome} \n\nFeliz Aniversário! 🎉🎂\n\nAtenciosamente,\nSua Empresa`,
    };
  
    smtp.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("E-mail enviado: " + info.response);
      }
    });
  } 

  
  function job(aniversariantes) {
const hoje = new Date()
  .toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })
  .replace(/\//g, "-");



    console.log(typeof aniversariantes)
    console.log(hoje);
  
    aniversariantes.forEach(({ nome, email, aniversario }) => {
      console.log(aniversariantes)
      console.log(aniversario)
      if (aniversario === hoje) {
        enviarEmailAniversario(nome, email);
      } else { console.log("a data nao é iguaL")}
    });
  }
  
  job(aniversariantes);

    return {
        statusCode: 200,
        body: JSON.stringify(aniversariantes , "email sent"),
        headers: {
            'Content-Type': 'application/json',
        },
    }

}
