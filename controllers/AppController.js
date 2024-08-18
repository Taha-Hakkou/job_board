// App controller
import dbClient from '../utils/db';

const AppController = class {
  static getStatus(_req, res) {
    res.status(200).json({
      db: dbClient.isAlive(),
    });
  }

  static async getStats(_req, res) {
    res.status(200).json({
      users: await dbClient.nbUsers(),
      jobs: await dbClient.nbJobs(),
    });
  }
};

export default AppController;
