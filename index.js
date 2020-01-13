const http= require('http');
const express = require('express');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const pets = require('./models/pets');


app.get('/pets', async (req, res) => {
    const thePets = await pets.all();
    // // res.send('you want /pets');
    res.json(thePets);
    // const jsonString = JSON.stringify(thePets);
    // res.write(jsonString);
    // res.end();
});

app.get('pets/:id')
//create
app.get('/pets/create')
app.post('/pets/create')
//update
app,get('/pets/:id/edit')
app.post('/pets/:id/edit')
//delete
app.get('/pets/:id/delete')
app.post('/pets/:id/delete')

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});