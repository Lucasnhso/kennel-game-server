import { Request, Response } from "express";
import dbRepository from "../repositories/dbRepository";
import { newCross } from "../services/dogs";

export default {
  index: async function(req: Request, res: Response) {
    const data = await dbRepository.dog.findMany({
      include: {
        breeds: {
          include: {
            breed: true
          }
        },
        father: true,
        mother: true
      }
    })
    res.send(data)
  },
  cross: async function(req: Request, res: Response) {
    const {father, mother} = req.body;
    console.log(req.body)
    const newDogs = await newCross({father, mother});
    res.send(newDogs);
  }
} 