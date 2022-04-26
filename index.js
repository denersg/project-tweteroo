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
});

function returnLastMessages(arr){
    if(arr.length <= 10){
        const messages = [];
        for(let i = arr.length-1; i >= 0; i--){
            messages.push(arr[i]);
        }
        return(messages);
    }
    else{
        let messages = [];
        for(let i = arr.length-1; i >= arr.length-10; i--){
            messages.push(arr[i]);
        }
        return(messages);
    }
}

app.get("/tweets", (req, res) => {
    res.send(returnLastMessages(TWEETS));
});

app.listen(5000, () => {
    console.log(chalk.blue.bold("Servidor de pé na porta 5000"));
});