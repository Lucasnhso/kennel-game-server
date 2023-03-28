import { getRandomNumber } from "../utils/getRandomNumber";
import { Breed } from "./Breed";

interface IPercentBreed {
  breed: Breed;
  percent: number;
}
type DogFields = Omit<Dog, 'calculateBreed'| 'percentBreed' | 'height'| 'weight'>

function dogFieldsValidate(fields: DogFields) {
  const { name, breed, father, mother, gender } = fields;
  if(!breed) {
    if(!father || !mother){
      throw new Error("father and mother is mandatory")
    }
    
    else if(father){
      if(!mother){
        throw new Error("mother can't be null")
      }
      if (father.gender !== 'M'){
        throw new Error('father has to be male')
      }
    }
    else if(mother){
      if(!father){
        throw new Error("father can't be null")
      }
      if(mother.gender !== 'F'){
        throw new Error('mother has to be female')
      }
    }
  }
  else if(father && mother) {
    if(breed) {
      throw new Error("if has father and mother, breed must be null")
    }
  }
}

export class Dog {
  name: string;
  gender: 'M' | 'F';
  breed?: IPercentBreed[];
  father?: Dog;
  mother?: Dog;
  height: number;
  weight: number;

  constructor(fields: DogFields){
    try {
      dogFieldsValidate(fields)
    } catch (error) {
      throw new Error()
    }
    const { name, breed, father, mother, gender } = fields;
    this.name = name;
    this.gender = gender;
    this.breed = breed;
    this.father = father;
    this.mother = mother;

    if(this.breed) {
      this.height = this.breed.reduce((accumulator, current) => {
        return accumulator + (current.breed.aleatoryHeight() * (current.percent * 0.01))
      }, 0)
      this.weight = this.breed.reduce((accumulator, current) => {
        return accumulator + (current.breed.aleatoryWeight(this.gender) * (current.percent * 0.01))
      }, 0);
    }
    else {
      if(this.mother && this.father) {
        const fatherWeight = this.father.weight
        const motherWeight = this.mother.weight
        let minWeight = fatherWeight > motherWeight ? motherWeight : fatherWeight
        let maxWeight = fatherWeight < motherWeight ? motherWeight : fatherWeight
        minWeight = minWeight * 0.80
        maxWeight = maxWeight * 1.20
        const fatherHeight = this.father.height
        const motherHeight = this.mother.height
        let minHeight = fatherHeight > motherHeight ? motherHeight : fatherHeight
        let maxHeight = fatherHeight < motherHeight ? motherHeight : fatherHeight
        minHeight = minHeight * 0.80
        maxHeight = maxHeight * 1.20

        this.height = getRandomNumber(minHeight, maxHeight);
        this.weight = getRandomNumber(minWeight, maxWeight, 2);
      }
      else {
        this.height = 0;
        this.weight = 0;
      }
    }
  }

  
  calculateBreed(): IPercentBreed[]{
    let calculatedBreed: IPercentBreed[] = []
    if(this.breed) {
      calculatedBreed = this.breed
    }
    else if(this.father && this.mother) {
      this.father.percentBreed.forEach(e => {
        calculatedBreed.push({
          breed: e.breed,
          percent: e.percent / 2
        })
      });
      this.mother.percentBreed.forEach(e => {
        let existentBreedIndex = calculatedBreed.findIndex(it => it.breed === e.breed)
        if(existentBreedIndex > -1){
          calculatedBreed[existentBreedIndex].percent = e.percent / 2 + calculatedBreed[existentBreedIndex].percent
        }
        else{
          calculatedBreed.push({
            breed: e.breed,
            percent: e.percent / 2
          })
        }
      })
    }
    return calculatedBreed
  }

  get percentBreed(){
    return this.calculateBreed()
  }
}