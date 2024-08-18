// App Routes
// import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
// import AuthController from '../controllers/AuthController';
import JobsController from '../controllers/JobsController';

const routesLoader = (app) => {
  // app.get('/status', AppController.getStatus);
  // app.get('/stats', AppController.getStats);

  app.post('/register', UsersController.postUser);
  // app.get('/login', AuthController.getConnect);
  // app.get('/logout', AuthController.getDisconnect); // or delete()

  app.post('/jobs', JobsController.postJob);
  // app.get('/jobs', JobsController.getJobs);
  // app.get('/jobs/:id', JobsController.getJob);
};

export default routesLoader;
