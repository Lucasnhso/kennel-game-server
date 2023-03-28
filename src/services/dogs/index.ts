// import { Dog } from '../../models/Dog';
import maleNames from '../../dogNames/male.json'
import femaleNames from '../../dogNames/female.json'
import { getRandomNumber } from '../../utils/getRandomNumber';
import { Dog, PercentBreed } from '@prisma/client';
import dbRepository from '../../repositories/dbRepository';

function getRandomName(gender: 'F'|'M') {
  if(gender === 'F') {
    return femaleNames[getRandomNumber(0, femaleNames.length)]
  }
  else {
    return maleNames[getRandomNumber(0, maleNames.length)]
  }
}

function getRandomGender(){
  const genders: ('F' | 'M')[] = ['F', 'M']
  return genders[getRandomNumber(0, genders.length-1)]
}

async function generatePuppies({puppiesQuantity, father, mother}: {puppiesQuantity: number, father: Dog & {breeds: PercentBreed[]}, mother: Dog & { breeds: PercentBreed[]} }) {
  let puppies: Dog[] = []

  for(let i = 0; i < puppiesQuantity; i++) {
    const gender = getRandomGender();
    console.log('gend', gender)
    const puppy = await dbRepository.dog.create({
      data: {
        name: getRandomName(gender),
        gender,
        fatherId: father.id,
        motherId: mother.id,
        height: 2,
        weight: 2
      }
    });
    let percentBreeds: Omit<PercentBreed, 'id'>[] = []
    father.breeds.forEach(fatherBreed => {
      percentBreeds.push({
        dogId: puppy.id,
        breedId: fatherBreed.breedId,
        percent: fatherBreed.percent / 2
      })
    })
    
    mother.breeds.forEach(motherBreed => {
      const existentBreedIndex = percentBreeds.findIndex(e => e.breedId === motherBreed.breedId)
      if(existentBreedIndex > -1){
        percentBreeds[existentBreedIndex].percent = motherBreed.percent / 2 + percentBreeds[existentBreedIndex].percent
      }
      else {
        percentBreeds.push({
          dogId: puppy.id,
          breedId: motherBreed.breedId,
          percent: motherBreed.percent / 2
        })
      }
    })

    percentBreeds.forEach(async item => {
      await dbRepository.percentBreed.create({ data: item })
    })
    puppies.push(puppy);
  }
  return puppies
}

export async function newCross({father, mother}: { father:Dog & { breeds: PercentBreed[]}, mother:Dog & { breeds: PercentBreed[]} }){
  const puppiesQuantity = getRandomNumber(1, 4);
  const puppies = await generatePuppies({
    puppiesQuantity,
    father,
    mother
  })
  console.log('qtd', puppies.length)
  return puppies
}

export async function newRandomDog(numberBreeds: number, gender: 'F' | 'M' = getRandomGender()){
  const puppy = await dbRepository.dog.create({
    data: {
      name: getRandomName(gender),
      gender,
      height: 2,
      weight: 2
    },
  });

  let percentsPossibilities: number[] = []
  let percentPerItem = Math.floor(100 / numberBreeds)
  for (let i = 0; i < numberBreeds; i++){
    if(i === numberBreeds - 1) {
      let totalPercentsAtual = percentsPossibilities.reduce((acc, curr) => acc + curr, 0)
      percentsPossibilities.push(100 - totalPercentsAtual)
    }
    else {
      percentsPossibilities.push(percentPerItem) 
    }
  }
  let aleatoryPercents: number[] = []
  percentsPossibilities.forEach((itemPercent, index) => {
    if(percentsPossibilities.length-1 !== index){
      let aleatoryPercent = getRandomNumber(1, itemPercent)
      percentsPossibilities[index + 1] += itemPercent - aleatoryPercent
      aleatoryPercents.push(aleatoryPercent);
    }
    else{
      aleatoryPercents.push(itemPercent)
    }
  })

  const breeds = await dbRepository.breed.findMany({})
  let breedsUsed: number[] = []
  let percentBreeds: Omit<PercentBreed, 'id'>[] = []
  for(let i = 0; i < numberBreeds; i++) {
    const breedIndex = getRandomNumber(0, breeds.length - 1,{blackList: breedsUsed})
    const breedId = breeds[breedIndex].id
    percentBreeds.push(await dbRepository.percentBreed.create({
      data: {
        dogId: puppy.id,
        breedId,
        percent: aleatoryPercents[i],
      }
    }))
    breedsUsed.push(breedIndex)
  }

  const createdDog = await dbRepository.dog.findUnique({
    where: {
      id: puppy.id
    },
    include: {
      breeds: true
    }
  })

  return createdDog
}