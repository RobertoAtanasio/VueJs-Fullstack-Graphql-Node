const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    password: "postgre",
	host: "localhost",
	database: "namegator",
	port: 5432
});

client.connect();

// node database.js para testar

// client.query("select * from item", function(err, res) {
//     console.log(res);
// });

// Modelo do retorno:
/*
Result {
  command: 'SELECT',
  rowCount: 6,
  oid: null,
  rows: [
    { id: 1, type: 'prefixos', description: 'Air' },
    { id: 2, type: 'prefixos', description: 'Jet' },
    { id: 3, type: 'prefixos', description: 'Flight' },
    { id: 4, type: 'sufixos', description: 'Hub' },
    { id: 5, type: 'sufixos', description: 'Station' },
    { id: 6, type: 'sufixos', description: 'Mart' }
  ],
  fields: [...
*/

// o callback é o último parâmetro!

exports.execute = async function (query, values) {
    return new Promise(function(resolve, reject) {
        client.query(query, values, function(err, res) {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    });
	// const res = await client.query(query, values);
	// return res.rows;
};