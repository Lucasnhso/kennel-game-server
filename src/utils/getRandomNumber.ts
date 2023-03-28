interface IOptions {
  decimalPlaces?: number;
  blackList?: number[];
}

export function getRandomNumber(min:number, max: number, options: IOptions = {}): number {
  const { decimalPlaces = 0, blackList = [] } = options;
  const randomNumber = Number( ((Math.random() * (max - min)) + min).toFixed(decimalPlaces) );
  return blackList.findIndex(e => e === randomNumber) > -1 ? getRandomNumber(min, max, options) : randomNumber;
}