import nodemailer from "nodemailer"
import { config } from "dotenv"

config()

const access = "ya29.a0AcM612xp_G0qa0VlV4Fpd8MNJK-BDVcUV8mUhzlaNCRc4qdyTJqmbBh8G5tN-LipnZLgfXv1OYTepRVm08McUE4ZxDpd4X8lDqeC_0t06SiHUqjzFjQp-QR7x2O_34pPWzUWEZeYUho-z1OGLzsaUcvuqLVoYUY1tWI4Y8onaCgYKAaYSARMSFQHGX2MiWR5idziBsIC-pmU-b9r3FA0175"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: "rissardi.luiz2006@gmail.com",
        password: "Luiz2006@",
        clientId: process.env.CLIENT_ID,
        clientSecret:  process.env.CLIENT_SECRET,
        // refreshToken: process.env.REFRESH_TOKEN,
        accessToken: access,
    }
})

try {

    const data = await transport.sendMail(
        {   
            from: "rissardi.luiz2006@gmail.com",
            to: "rissardi.luiz2006@gmail.com",
            subject: 'ola luiz',
            text: 'um simples teste para o serviço de enviio de email '
        })
    console.log(data);
} catch (error) {
    console.log(error);
}