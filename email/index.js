import nodemailer from "nodemailer"
import { config } from "dotenv"

config()

const access = "ya29.a0Ad52N3_FwVsvgYXqlOkkWtAtdaUfqtR9zupC2Krw9VeagjQL5sRg6Q1xZnv4HF10qFH5eX-TcAeyZDJlSrXg8k3PasxRG_ExZWmwpvgLDS2toC9BndYpkyc_O3Ype0rxTWfXKypyh9pPAYXdjrIOEhjm_sgr3ot9TtUfaCgYKAZ4SARMSFQHGX2Mi4Rq5cXL3eqtcuIgW3xDr5A0171"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: "rissardi.luiz2006@gmail.com",
        password: "Luiz2006@",
        clientId: process.env.CLIENT_ID,
        clientSecret:  process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
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