const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

// This is the session management middleware
// created by the Express.js team
const session = require('express-session');

// Give us a modified version of the Express team's
// session management software.
// We want one that can save session info a file
// on the hard drive.
const FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore({}),

    // We will move this to a secure location, shortly.
    secret: 'lalala1234lalala'
}));

// When we app.use(session), the session middleware
// adds the variable `req.session` 

// As the user browses from page to page, their
// browser shows us a "cookie"
// and the session middleware attaches that user's 
// session info to the request.


// Let's see what's in the session!!!!
app.use((req, res, next) =>  {
    console.log('***********');
    console.log(req.session);
    console.log('***********');

    next();
});

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const { dateToFormattedString } = require('./utils');


// Use this if you're building an API
// that accepts JSON data from the client.
// const parseJson = bodyParser.json();

// This is what you'll see in tutorials.
// I think it's not so great.
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

const server = http.createServer(app);

const pets = require('./models/pets');
const owners = require('./models/owners');


// See all pets!
app.get('/pets', async (req, res) => {
    const thePets = await pets.all();
    // res.send('you want /pets');
    res.json(thePets);

    // Here's what `res.json()` is doing:
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // })
    // const jsonString = JSON.stringify(thePets);
    // res.write(jsonString);
    // res.end();
});

app.get('/pets/:id(\\d+)', async (req, res) => {
    console.log('you want to get by id');
    // show me a single pet by their id
    const { id } = req.params;
    const thePet = await pets.one(id);
    res.json(thePet);
});

// Hint: npm i body-parser

// Create
app.get('/pets/create', (req, res) => {
    console.log('you want the form');
    // console.log('yes you are at /pets/create');
    // res.send('yes you are at /pets/create');

    // express will look in templates/pets/form.html
    res.render('pets/form', {
        locals: {
            name: '',
            species: '',
            birthdate: ''
        }
    });
});
app.post('/pets/create', parseForm, async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.species);
    console.log(req.body.birthdate);

    const { name, species, birthdate } = req.body;
    // const name = req.body.name;
    // const species = req.body.species;
    // const birthdate = req.body.birthdate;

    // I could create a new pet!
    // and I'm going to hard code the owner id!

    const owner_id_CHANGEME = 1;
    const newPetId = await pets.create(name, species, birthdate, owner_id_CHANGEME);
    console.log(`The new pet id is ${newPetId}`);

    res.redirect(`/pets/${newPetId}`);
});

// Update
app.get('/pets/:id/edit', async (req, res) => {

    const { id } = req.params;
    // const id = req.params.id;

    const thePet = await pets.one(id);

    res.render('pets/form', {
        locals: {
            name: thePet.name,
            species: thePet.species,
            birthdate: dateToFormattedString(thePet.birthdate)
        }
    });
});
app.post('/pets/:id/edit', parseForm, async (req, res) => {
    const { name, species, birthdate } = req.body;
    const { id } = req.params;
    const result = await pets.update(id, name, species, birthdate);
    if (result) {
        res.redirect(`/pets/${id}`);
    } else {
        res.redirect(`/pets/${id}/edit`)
    }
});

// Delete
app.get('/pets/:id/delete')
app.post('/pets/:id/delete')

// Login!
app.get('/login', (req, res) => {
    res.render('owners/auth');
});
app.post('/login', parseForm, async (req, res) => {
    console.log(req.body);
    const { name, password } = req.body;
    const didLoginSuccessfully = await owners.login(name, password);
    if (didLoginSuccessfully) {
        console.log(`yay! you logged in!`);
    } else {
        console.log(`boooooooo. that is not correct`);
    }
});

// "Profile" - list pets for this owner
app.get('/profile');

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});