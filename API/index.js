const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'gblingenieriaservidorgbl@gmail.com', 
        pass: 'cdfq uzjs mlxs wwnm' 
    },
  });


app.use(bodyParser.urlencoded({ extended: true }));



app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;

    
    const mailOptions = {
        from: email,
        to: 'destinatario@gmail.com', 
        subject: subject,
        text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error'); 
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Mensaje enviado. Gracias por ponerte en contacto.'); 
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});