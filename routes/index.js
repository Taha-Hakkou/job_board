// App Routes
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import JobsController from '../controllers/JobsController';
import jwtAuthCookie from '../middlewares/jwtAuthCookie';

const routesLoader = (app) => {
  app.get('/status', AppController.getStatus);
  app.get('/stats', AppController.getStats);

  app.post('/register', UsersController.postUser);
  app.get('/login', AuthController.getConnect);
  app.get('/logout', jwtAuthCookie, AuthController.getDisconnect);
  app.get('/me', jwtAuthCookie, UsersController.getMe);

  app.get('/jobs', JobsController.getJobs);
  app.get('/jobs/:id', JobsController.getJob);

  app.post('/jobs', jwtAuthCookie, JobsController.postJob);
  app.post('/jobs/:id', jwtAuthCookie, JobsController.applyJob);
};

export default routesLoader;
