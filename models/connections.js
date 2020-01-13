//require pg promise but call it immediatey so we can configure the connection

const pgp = require('pg-promise')({
    query: e => {
        // print the SQL query
        console.log('QUERY: ${e.query}');
    }
});

// nest, give th einfo about our specific database that we're talking to

const options = {
    host: 'localhost',
    database: 'fullstack-pets'
};

const db = pgp(options);

module.exports= db;