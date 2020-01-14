const pets = require('./models/pets');

async function main() {
    const thePets = await pets.all();
    // console.log(thePets);
    const aPet = await pets.one(1);
    // console.log(aPet);
    const result = await pets.del(1);
    // console.log(result);
    const resultName = await pets.updateName(1, 'the amazing oakley');
    //console.log(result);
    const updateResult = await pets.updateBirthdate(1, new Date());
    // console.log(updateResult);
    const createResult = await pets.create('billy', 'goat', '2020-01-13', 1);
    console.log(result);
}

main();