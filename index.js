const http= require('http');
const express = require('express');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const pets = require('./models/pets');

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

//const parseJSON = bodyParser.json();

app.get('pets/:id(\\+d)', async (req, res) => {
    // show me a single pet by their id
    const { id } = req.params;
    const thePet = await pets.one(id);
    res.json(thePet);
});


app.get('/pets/create', (req, res) => {
    // console.log('AH');
    // res.send('BOG');
    res.render('pets/form');
});
app.post('/pets/create', parseForm, async (req, res) => {
    console.log(req.body);
    // console.log(req.body.name);
    const {name, species, birthdate} = req.body;
    // I could create a new pet and I'm going to hardcode the owner ID
    const owner_id_CHANGEME = 1;
    const newPetId = await pets.create(name, species, birthdate, owner_id);
    console.log(`The new pet id is ${newPetId}`);
    res.redirect(`/pets/${newPetId}`);
});


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});