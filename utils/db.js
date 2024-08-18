// DBClient class
import { MongoClient } from 'mongodb';

const DBClient = class {
  constructor() {
    const HOST = process.env.DB_HOST || 'localhost';
    const PORT = process.env.DB_PORT || 27017;
    const DB = process.env.DB_DATABASE || 'job_board';
    const uri = `mongodb://${HOST}:${PORT}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    (async () => {
      await this.client.connect();
      this.db = await this.client.db(DB);
    })();
  }

  //isAlive() { return Boolean(this.db); } // this.client.isConnected(); [Deprecated]

  /*async nbUsers() {
    const nbUsers = await this.db.collection('users').countDocuments();
    return nbUsers;
  }*/
};

const dbClient = new DBClient();
export default dbClient;
