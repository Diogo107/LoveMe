const Celebrity = require('./models/animal');
const mongoose = require('mongoose');
require('dotenv').config();

let feed = [
  {
    name: 'Zé das Coves',
    specie: 'cat',
    breed: 'Persa',
    animalAge: 'betweenOneandFive',
    animalGender: 'male',
    animalSize: 'small',
    animalVaccination: 'yes',
    animalCastration: 'yes',
    animalDescription: 'This is the description of the cat'
  },
  {
    name: 'Alberto Fugido',
    specie: 'dog',
    breed: 'Rafeiro',
    animalAge: 'betweenOneandFive',
    animalGender: 'male',
    animalSize: 'large',
    animalVaccination: 'no',
    animalCastration: 'no',
    animalDescription: 'Tem pulgas'
  },
  {
    name: 'Arranha Pernas',
    specie: 'cat',
    breed: 'Azul Russo',
    animalAge: 'betweenOneandFive',
    animalGender: 'Female',
    animalSize: 'x-large',
    animalVaccination: 'yes',
    animalCastration: 'no',
    animalDescription: 'Tem muitas muitas pulgas'
  },
  {
    name: 'Gatinho Peludo',
    specie: 'cat',
    breed: 'Siamês',
    animalAge: 'betweenOneandFive',
    animalGender: 'male',
    animalSize: 'large',
    animalVaccination: 'no',
    animalCastration: 'yes',
    animalDescription: 'Tem carrapatos atrás das orelhas'
  },
  {
    name: 'Ladra demais',
    specie: 'dog',
    breed: 'Rafeiro',
    animalAge: 'moreThenFive',
    animalGender: 'Female',
    animalSize: 'x-large',
    animalVaccination: 'no',
    animalCastration: 'no',
    animalDescription: 'Já foi mais novo'
  }
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    return Celebrity.insertMany(feed);
  })
  .then(() => mongoose.disconnect())
  .catch(error => {
    console.log('Error', error);
  });
