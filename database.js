import Database from './lib/db';
import mockData from './mockData';

// Setup the database
const db = new Database();
db.addCollection('cats', mockData.cats);

db.addCollection('dogs', mockData.dogs);

db.addCollection('pokemons', mockData.pokemons);

export default db;
