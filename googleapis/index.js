import express from 'express';
import { google } from 'googleapis';
import { config } from 'dotenv';
import path from "path"

config({
    path:path.resolve("./googleapis/.env")
})
const app = express();
const PORT = 3000;

// Configurações de autorização
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:3000/auth/callback");

const SCOPES = ['https://mail.google.com/'];

// Escopos de acesso necessários
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
});

oauth2Client.


// Rota para iniciar o processo de autorização
app.get('/auth/google', async (req, res) => {
    // Redirecione o usuário para a URL de autorização
    res.redirect(authUrl);
});

// Rota de retorno de redirecionamento autorizado
app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        res.status(400).send('Código de autorização não fornecido.');
        return;
    }
    try {
        // Trocar o código de autorização por um novo par de tokens de acesso e atualização
        const { tokens } = await oauth2Client.getToken(code)
        console.log('Novo token de atualização:', tokens);

        res.send(` Token de atualização renovado com sucesso. ${code}`);
    } catch (error) {
        console.error('Erro ao obter novos tokens:', error);
        res.status(500).send('Erro ao obter novos tokens.');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
