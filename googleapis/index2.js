import nodemailer from "nodemailer"
import { google } from "googleapis"
import { config } from 'dotenv';
import path from "path"

config({
    path: path.resolve("./googleapis/.env")
})

const REDIRECT_URI = "https://developers.google.com/oauthplayground"

const userAuth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    REDIRECT_URI)
userAuth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

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
            html: '<h1>Hello from gmail email using API</h1>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const data = await sendMail();
console.log(data);