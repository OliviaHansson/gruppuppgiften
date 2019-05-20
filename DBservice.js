import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
import mockData from './mockData';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database
const db = new Database();
db.addCollection('cats', mockData.cats);

db.addCollection('dogs', mockData.dogs);

db.addCollection('pokemons', mockData.pokemons);

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
