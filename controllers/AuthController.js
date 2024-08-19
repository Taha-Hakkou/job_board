// Auth Controller
import jwt from 'jsonwebtoken';
import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

const AuthController = class {
  static async getConnect(req, res) {
    const basicAuth = req.headers.authorization.split(' ')[1];
    const [email, password] = Buffer.from(basicAuth, 'base64').toString('utf8').split(':');
    const user = await dbClient.db.collection('users').findOne({
      email,
      password: sha1(password),
    });
    if (user === null) return res.status(401).json({ error: 'Unauthorized' });
    /*const token = uuidv4();
    const key = `auth_${token}`;
    redisClient.set(key, user._id.toString(), 24 * 60 * 60 * 1000);*/
    const token = jwt.sign(user, 'secret', { expiresIn: 60 });
    res.cookie('token', token, {
      httpOnly: true,
    });
    return res.status(200).json({ token });
  }

  /*static async getDisconnect(req, res) {
    const userId = await redisClient.get(`auth_${req.headers['x-token']}`);
    const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });
    if (user === null) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      redisClient.del(`auth_${req.headers['x-token']}`);
      res.status(204).send();
    }
  }*/
};

export default AuthController;
