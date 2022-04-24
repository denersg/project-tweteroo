import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

let userData = [];
let TWEETS = [];
let userPicture = "";
const app = express();//Criado o servidor

app.use(cors());
app.use(json());

app.post("/sign-up", (req, res) => {
    const body = req.body;
    const userSignUp = {
        username: body.username,
        avatar: body.avatar
    };

    userPicture = body.avatar;

    userData.push(userSignUp);
    res.send("OK");
    console.log(chalk.green("OK"));
    console.log("body da requisição(sign-up):", body);
});

app.post("/tweets", (req, res) => {
    const body = req.body;
    const newTweet = {
        username: body.username,
        avatar: userPicture,
        tweet: body.tweet
    };

    TWEETS.push(newTweet);
    res.send("OK");
    console.log(chalk.magenta.inverse("OK"));
    console.log("body da requisição(tweets):", body);
});

app.get("/tweets", (req, res) => {
    // console.log("ENTROU EM TWEETS");
    // for(let i = 0; i < TWEETS.length; i++){
        res.send(TWEETS);
    // }
});

app.listen(5000, () => {
    console.log(chalk.blue.bold("Servidor de pé na porta 5000"));
});



/* ------- Como rodar -------
Pra conseguir rodar, eu tenho que ligar o servidor com a requisição post do 'sign-up' somente.

NÃO posso ligar os outros servidores antes de fazer o cadastro e enviar o 1º tweet. Depois
de mandar o 1º tweet, aí sim eu posso ligar os outros servidores de 'get' e 'post'
(até p/ ver qual foi o resultado)

*/