import nodemailer from "nodemailer"
import moment from "moment"


export const handler = async (event) => {
  
  
  const smtp = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: 0,
    auth: {
      user: "lambdateste@hotmail.com",
      pass: "l@mbdaTest",
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
      from: "lambdateste@hotmail.com", // Substitua com seu e-mail
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
  
  const aniversariantes = [
    { nome: "João", email: "thekidpocotom@gmail.com", aniversario: "10-03" },
  ];
  
  function job(aniversariantes) {
    const hoje = moment().format("MM-DD");
    console.log(hoje);
  
    aniversariantes.forEach(({ nome, email, aniversario }) => {
      console.log(aniversario)
      if (aniversario === hoje) {
        enviarEmailAniversario(nome, email);
      }
    });
  }
  
  job(aniversariantes);





    return {
        statusCode: 200,
        body: JSON.stringify(aniversariantes),
        headers: {
            'Content-Type': 'application/json',
        },
    }
  }