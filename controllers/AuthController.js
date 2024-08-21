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
    const token = jwt.sign(user, 'secret', { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
    });
    return res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    let doc = await dbClient.db.collection('utils').findOne({
      name: 'blackListedTokens'
    });
    if (doc === null) {
      doc = { name: 'blackListedTokens', tokens: [] };
      await dbClient.db.collection('utils').insertOne(doc);
    }
    await dbClient.db.collection('utils').findOneAndUpdate(
      { _id: doc._id },
      { $push: { tokens: sha1(req.cookies.token) } },
    );
    return res.json({ message: 'Signed out successfully' });
  }
};

export default AuthController;
