import nodemailer from "nodemailer"
import { config } from "dotenv"

config()

const access = "ya29.a0AXooCguoyTZ4pIEQAq9HD0GYZ8ym2MXe0K1og6DPUeg-aVac2_udXJ8wyATw3FCQbf6mVtYynTLbOjLChH6_JCHCQZdZ0m7HPosgJozg5qJRLw1TYSNaTaYmPiaRo3o50uVT91w5Wm7EZeIEkDeAp6j9kKvS9M_tqAaCgYKAWESARMSFQHGX2MirrXJlNSJTxC4FpjQk9t7VA0169"

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