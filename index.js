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
db.addCollection('cats', mockData);

db.addCollection('dogs', mockData);

db.addCollection('pokemons', mockData);

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
}

const cat = new Creature('cat', db.cats, app);
cat.registerPost();

app.get('/cats', (req, res) => res.status(200).send({
  success: true,
  data: db.cats.all(),
}));

app.get('/cat/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const cat = db.cats.find({ id });
  if (cat) {
    return res.status(200).send({
      success: true,
      data: cat,
    });
  }
  return res.status(404).send({
    success: false,
    message: 'Cat not found',
  });
});

app.get('/catSearch/:key/:value', (req, res) => {
  const { key, value } = req.params;
  const cat = db.cats.find({ [key]: value });
  if (cat) {
    return res.status(200).send({
      success: true,
      data: cat,
    });
  }
  return res.status(404).send({
    success: false,
    message: 'Cat not found',
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
