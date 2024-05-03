import nodemailer from "nodemailer";
import { config } from "dotenv";
import { google } from "googleapis";

config();

const userAuth2 = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

userAuth2.setCredentials({
    scope:"https://mail.google.com/",
    refresh_token: process.env.REFRESH_TOKEN
});

const transport = nodemailer.createTransport({
    service: "gmail",
    port:587,
    secure:true,
    host:"smpt.gmail.com",
    auth: {
        type: 'OAuth2',
        user: "rissardi.luiz2006@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken:"ya29.a0AXooCguHq90cI1WKUu5Dc-jTQyEZw24MCelj9eNS-GPj4nkfJutaYLZxW5ljmvX8WXZEJkLwZbB9kQkex5xijeL9ZzX9HDf0dDak5edWmV1A_VLrvG8yrRLPtpIq-ACfA1_qpRnp0eYwbT6bPxAFk4gmZfVtSjqGHlKRaCgYKAccSARMSFQHGX2MiJFfsy1hicHs1NU-z4n5dwg0171"
    }
});

// Configura um callback para lidar com a renovação do token de acesso
transport.set('oauth2_provision_cb', async (user, renew, callback) => {
    try {
        // Obtém um novo token de acesso
        const { token } = await userAuth2.getAccessToken();
        console.log(token);
        // Atualiza o token de acesso no transporte
        transport.set('accessToken', token);
        callback();
    } catch (error) {
        console.error("Erro ao obter novo token de acesso:", error);
        callback(error);
    }
});


const sendEmail = async () => {
    try {
        const data = await transport.sendMail({
            from: "rissardi.luiz2006@gmail.com",
            to: "rissardi.luiz2006@gmail.com",
            subject: 'ola luiz',
            text: 'um simples teste para o serviço de envio de e-mail '
        });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

sendEmail();
