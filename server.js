const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'smartbrain'

    }
});



const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('It is working!')
})

app.post('/signin', (req,res)=>{signin.handleSignIn(req,res,db,bcrypt)})

app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req, res)=>{profile.handleProfile(req,res)})

app.put('/image', (req, res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT||3001, () => {
    console.log(`Hellooo Port ${process.env.PORT}!`)
})