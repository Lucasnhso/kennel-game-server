import express from 'express';
import cors from 'cors';
import { newCross, newRandomDog } from './src/services/dogs';
import routes from './src/routes';
import dbRepository from './src/repositories/dbRepository';
// import { Dog } from './src/models/Dog';
// import { newCross } from './src/controllers/dog.controller';
// import { Breed } from './src/models/Breed';

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

// const pitBull = new Breed({
//   name: 'Pit Bull',
//   minHeight: 45,
//   maxHeight: 53,
//   femaleMinWeight: 14,
//   femaleMaxWeight: 23,
//   maleMinWeight: 16,
//   maleMaxWeight: 27
// })
// const rottweiler = new Breed({
//   name: 'Rottweiler',
//   minHeight: 45,
//   maxHeight: 53,
//   femaleMinWeight: 35,
//   femaleMaxWeight: 45,
//   maleMinWeight: 50,
//   maleMaxWeight: 60
// })

// const fred = new Dog({
//   name: 'Fred',
//   breed: [
//     { breed: pitBull, percent: 100 }
//   ],
//   gender: 'M'
// });
// const laila = new Dog({
//   name: 'Laila',
//   breed: [
//     { breed: rottweiler, percent: 100 }
//   ],
//   gender: 'F'
// })
// const flPuppy = newCross({
//   father: fred,
//   mother: laila
// })

// app.get('/dogs', (req, res) => {
//   // res.send(flPuppy)
// })

app.listen(port, async () => {
  console.log('Aplicação executando na porta', port);
  // const macho = await newRandomDog(3, 'M')
  // const femea = await newRandomDog(1, 'F')
  // console.log('macho', macho);
  // console.log('femea', femea);
  
  // const father = await dbRepository.dog.findUnique({
  //   where: { id: 71 },
  //   include: { breeds: true}
  // })
  // const mother = await dbRepository.dog.findUnique({
  //   where: { id: 43 },
  //   include: { breeds: true}
  // })
  // if(father && mother) {
  //   await newCross({
  //     father,
  //     mother
  //   })
  // }
})
