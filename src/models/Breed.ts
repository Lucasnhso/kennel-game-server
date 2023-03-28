import { getRandomNumber } from "../utils/getRandomNumber";

export class Breed {
  name: string;
  minHeight: number;
  maxHeight: number;
  femaleMinWeight: number;
  femaleMaxWeight: number;
  maleMinWeight: number;
  maleMaxWeight: number;

  constructor({name, minHeight, maxHeight, femaleMinWeight, femaleMaxWeight, maleMinWeight, maleMaxWeight}: Omit<Breed, 'aleatoryHeight' | 'aleatoryWeight'>) {
    this.name = name;
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
    this.femaleMinWeight = femaleMinWeight;
    this.femaleMaxWeight = femaleMaxWeight;
    this.maleMinWeight = maleMinWeight;
    this.maleMaxWeight = maleMaxWeight;
  }

  aleatoryHeight() {
    return getRandomNumber(this.minHeight, this.maxHeight, 0);
  }
  aleatoryWeight(gender: 'M' | 'F') {
    if(gender === 'M') {
      return getRandomNumber(this.maleMinWeight, this.maleMaxWeight, 2);
    }
    return getRandomNumber(this.femaleMinWeight, this.femaleMaxWeight, 2);
  }
}