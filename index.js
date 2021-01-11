import express from 'express';
import http from 'http';

const app = express();
const httpSrv = http.Server(app);


const hello = (req, res) => {
    const name = req.param("name", null)
    console.log('je suis dans hello ' + name);
    res.end(`hello ${name}`);
}

app.post('/ping', function(req, res) {
    console.log('Je suis dans ping')
    res.end('pong')
});
app.get('/hello', hello)



const users = []
const postUsers = (req, res) => {
    console.log('l\' ')
    const usersVariable = req.param('username');
    const passwordVariable = req.param('password');
    const ts = new Date().getTime();

    const monUsers = {
        user: usersVariable,
        password: passwordVariable,
        ts: ts
    }
    users.push(monUsers);
    res.status(201);
    res.send("users créé");
}
const getUsers = (req, res) => {
    console.log('get users')
    res.json(users);
}



const messages = [];

const postMessages = (req, res) => {
    console.log('l\' utilisateur souhaite poster un message')
    const messageVariable = req.param('message');
    const usernameVariable = req.param('username');
    const ts = new Date().getTime();
    if (!messageVariable) {
        res.status(400).end("Message est vide");
        return;
    }

    if (usernameVariable == null || usernameVariable == undefined || usernameVariable == "") {
        res.status(400).end("Username est vide");
        return;
    }

    const monMessage = {
        message: messageVariable,
        username: usernameVariable,
        ts: ts
    }
    messages.push(monMessage);
    res.status(201);
    res.send("Message créé");
}
const getMesssages = (req, res) => {
        console.log('get messages')
        res.json(messages);
    }
    //Messages
app.post('/messages', postMessages);
app.get('/messages', getMesssages)

app.post('/users', postUsers);
app.get('/users', getUsers)

httpSrv.listen(8080, function() {
    console.log('listening on *:8080')

});