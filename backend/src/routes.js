import express from 'express';
import OngController from './controllers/ong';
import IncidentController from './controllers/incident';
import ProfileController from './controllers/profile';
import SessionController from './controllers/session';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({ message: 'welcome!' });
});

// session
routes.post('/session', SessionController.create);
// ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// ongs profile
routes.get('/profile', ProfileController.index);

// incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

export default routes;