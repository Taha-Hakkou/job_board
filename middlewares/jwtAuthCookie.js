import jwt from 'jsonwebtoken';

const jwtAuthCookie = (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.user = jwt.verify(token, 'secret');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not logged in' });
  };
}

export default jwtAuthCookie;
