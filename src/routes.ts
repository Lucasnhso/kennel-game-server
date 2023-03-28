import express from 'express';
import dogController from './controllers/dog.controller';
const routes = express.Router();

routes.get('/dogs', dogController.index)
routes.post('/dogs/cross', dogController.cross)

export default routes;
