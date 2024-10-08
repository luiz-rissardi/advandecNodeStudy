import nodemailer from "nodemailer"
import { google } from "googleapis"
import { config } from 'dotenv';
import path from "path"
import bodyParse from "body-parser"
import express, { Router } from "express";



config({
    path: path.resolve("./googleapis/.env")
})

const REDIRECT_URI = "https://developers.google.com/oauthplayground"

const userAuth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    REDIRECT_URI)

userAuth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })


const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email de Confirmação</title>
</head>
<body>
    <h1>Confirmação de Conta</h1>
    <p>Por favor, clique no botão abaixo para confirmar sua conta:</p>
    <form id="emailForm" action="http://localhost:3000/teste" method="POST">
        <label for="email" hidden>Email:</label>
        <input type="email" id="email" name="email" value="matheus.brito2005@gmail.com" hidden>
        <button type="submit">Enviar</button>
    </form>
</body>
</html>`


async function sendMail() {
    try {

        const accessToken = await userAuth
            .getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "rissardi.luiz2006@gmail.com",
                password: "Luiz2006@",
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'rissardi.luiz2006@gmail.com',
            to: 'rissardi.luiz2006@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: html,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const app = express();

app.use(bodyParse.urlencoded({
    extended:true
}))

app.listen(3000, async () => {
    console.log("server is running at 3000");
    const data = await sendMail();
    console.log(data);
})

const route = Router();

route.route("/teste").post((req, res) => {
    const data = req.body;
    console.log(data);
    res.redirect("https://app.brmodeloweb.com/#!/conceptual/661be00dbcd5212168680989")
})

app.use(route);

