import jwt from 'jsonwebtoken';
import sha1 from 'sha1';
import dbClient from '../utils/db';

const jwtAuthCookie = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.user = jwt.verify(token, 'secret');
    const bl = await dbClient.db.collection('utils').findOne({ name: 'blackListedTokens' });
    if (bl !== null) {
      if (bl.tokens.includes(sha1(token))) {
        throw new Error();
      }
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not logged in' });
  };
}

export default jwtAuthCookie;
