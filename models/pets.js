const db = require('./connection');
const { dateToFormattedString } = require('../utils');

// Create
async function create(name, species, birthdate, owner_id) {
    const result = await db.one(`
insert into pets
    (name, species, birthdate, owner_id)
values
    ($1, $2, $3, $4)    
returning id
    `, [name, species, birthdate, owner_id]);

    return result.id;
}

// Retrieve
async function one(id) {
    try {
        // Use .one() if there should exactly one result.
        // const onePet = await db.one(`select * from pets where id=${id}`);

        // $1 is syntax specfic to pg-promise
        // it means interpolate the 1st value from the array
        // (in this case, that's the `id` that we received as an argument)
        const onePet = await db.one(`select * from pets where id=$1`, [id]);
        return onePet;
    } catch (err) {
        return null;
    }
}

// Promise version
// function one(id) {
//     return db.one(`select * from pets where id=${id}`)
//                 .catch(err => {
//                     console.log(err);
//                     return null;
//                 })
// }

async function all() {
    try {
        // .query and .any are the same function
        // const thePets = await db.query(`select * from pets;`);
        const thePets = await db.any(`select * from pets;`);
        console.log(thePets);
        return thePets;
    } catch (err) {
        console.log(err)
        return [];
    }
}

// Promise version
// function all() {
//     return db.query(`select * from pets;`)
//             .catch(err => {
//                 return []
//             });
// }


// async function all() {
//     const allPets = await db.query(`select * from pets`)
//         .then(data => {
//             console.log(data);
//             return data;
//         })
//         .catch(err => {
//             console.log(err);
//             return [];
//         });
    
//     console.log(allPets);
//     return allPets;
// }

// Update
// function updateName(id, name) {
//     const resultPromise = db.result(`
//         update pets set
//             name=$1
//         where id=$2;
//     `, [name, id]);
//     resultPromise.then(result => {
//         if (result.rowCount === 1) {
//             return id;
//         } else {
//             return null;
//         }
//     });
//     return resultPromise;
// }

async function updateName(id, name) {
    const result = await db.result(`
        update pets set
            name=$1
        where id=$2;
    `, [name, id]);  
    // return result;

    // if we needed to do another
    // db call, we would need to
    // await it separately.
    // const anotherResult = await db.any();

    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}

async function updateSpecies(id, species) {
    const result = await db.result(`
        update pets set
            species=$1
        where id=$2;
    `, [species, id]);  
    // return result;

    // if we needed to do another
    // db call, we would need to
    // await it separately.
    // const anotherResult = await db.any();

    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}



async function updateBirthdate(id, dateObject) {
    // Postgres wants this: '2020-01-13'
    const dateString = dateToFormattedString(dateObject);
    const result = await db.result(`
        update pets set
            birthdate=$1
        where id=$2
    `, [dateString, id]);
    return result;
}


async function update(id, name, species, birthdate) {
    const result = await db.result(`
        update pets set
            name=$2,
            species=$3,
            birthdate=$4
        where id=$1;
    `, [id, name, species, birthdate]);  
    // return result;

    // if we needed to do another
    // db call, we would need to
    // await it separately.
    // const anotherResult = await db.any();

    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}


// Delete
async function del(id) {
    const result = await db.result(`delete from pets where id=$1`, [id]);
    console.log(result);
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
}


module.exports = {
    create,
    one,
    all,
    update,
    updateName,
    updateBirthdate,
    updateSpecies,
    del
}
