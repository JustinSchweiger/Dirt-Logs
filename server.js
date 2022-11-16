import express from 'express';
import fetch from 'node-fetch';
import { resolve } from 'path';

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/*', async (req, res) => {
    const log = req.originalUrl;

    if (log === '/') return res.sendFile(resolve('./public/page-not-found.html'));

    const discordAttachment = `https://cdn.discordapp.com/attachments${log}`;

    const response = await fetch(discordAttachment).catch(console.error);

    if (await response.status !== 200) {
        return res.sendFile(resolve('./public/page-not-found.html'));
    }

    return res.render("log-file", { log: await response.text() });
});

app.listen(process.env.FRONTEND_PORT, () => {
    console.log(`Server listening at ${process.env.FRONTEND_URL} on port ${process.env.FRONTEND_PORT}`);
});