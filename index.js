import Creature from './Creature';
import db from './server';
import app from './database';

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
