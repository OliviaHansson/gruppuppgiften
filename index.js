import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
// import { createSecureContext } from 'tls';
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

class Creature {
  constructor(type, collection, app) {
    this.type = type;
    this.collection = collection;
    this.app = app;
  }

  registerPost() {
    const path = `/${this.type}`;
    console.log('regPost', path);
    this.app.post(path, (req, res) => {
      if (!req.body.name) {
        console.log(req.body);
        return res.status(400).send({
          success: false,
          message: `Name is required for ${this.type}`,
        });
      }
      const newCreature = req.body;
      const newId = this.collection.push(newCreature);
      return res.status(201).send({
        success: true,
        message: `${this.type} added successfully`,
        id: newId,
      });
    });
  }

  getAll() {
    const path = `/${this.type}s`;
    console.log('getPost', path);

    this.app.get(path, (req, res) => res.status(200).send({
      success: true,
      data: db[`${this.type}s`].all()
    }));
  }

  getId() {
    const path = `/${this.type}/:id`;

    this.app.get(path, (req, res) => {
      const id = +req.params.id;
      const result = db[`${this.type}s`].all().find(obj => obj.id === id);
      if (result) {
        return res.status(200).send({
          success: true,
          data: result,
        });
      }
      return res.status(404).send({
        success: false,
        message: `${this.type} could not be found`,

      });
    });
  }

  getCreatureByTextValue() {
    const path = `/${this.type}s/:key/:value`;

    this.app.get(path, (req, res) => {
      const { key, value } = req.params;
      const result = db[`${this.type}s`].find({ [key]: value });
      if (result) {
        return res.status(200).send({
          success: true,
          data: result,
        });
      }
      return res.status(404).send({
        success: false,
        message: `${this.type}s not found`,
      });
    });
  }
}


const cat = new Creature('cat', db.cats, app);
cat.registerPost();
cat.getAll();
cat.getId();
cat.getCreatureByTextValue();

const dog = new Creature('dog', db.dogs, app);
dog.registerPost();
dog.getAll();
dog.getId();
dog.getCreatureByTextValue();

const pokemon = new Creature('pokemon', db.pokemons, app);
pokemon.registerPost();
pokemon.getAll();
pokemon.getId();
pokemon.getCreatureByTextValue();

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
