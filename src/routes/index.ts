import { Router } from 'express';
import UserController from '../Controllers/UserController';
import AuthController from '../Controllers/AuthController';
import ProductController from '../Controllers/ProductController';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'API working...' });
});

routes.post('/users', UserController.store);

// Auth Routes
routes.post('/auth/login', AuthController.login);
routes.post('/auth/register', AuthController.register);

// Product Routes
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

export default routes;
