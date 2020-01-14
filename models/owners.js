const db = require('./connection');
const bcrypt = require('bcryptjs');

function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// Create
function create(username, password) {
    const hash = createHash(password);
    const newUser = {
        username,
        hash
    };
    console.log(newUser);   
}

// Retrieve
async function login(username, password) {
    const theUser = await getByUsername(username);
    return bcrypt.compareSync(password, theUser.hash);
}

async function getByUsername(username) {
    const theUser = await db.one(`
        select * from owners where name=$1
    `, [username]);

    return theUser;
}

function getById(id) {

}
// Update

// Delete

module.exports = {
    create,
    login,
    getByUsername,
    getById
};