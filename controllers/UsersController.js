// Users Controller
import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import dbClient from '../utils/db';

const UsersController = class {
  static async postUser(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });
    const user = await dbClient.db.collection('users').findOne({ email });
    if (user !== null) return res.status(400).json({ error: 'Already exist' });
    const result = await dbClient.db.collection('users').insertOne({
      email,
      password: sha1(password),
    });
    return res.status(201).json({
      id: result.insertedId,
      email,
    });
  }
};

export default UsersController;
