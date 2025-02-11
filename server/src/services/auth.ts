import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string
}

export const authenticateToken = ({req}: any) => {
  const authHeader = req.headers?.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (!token) {return req}

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        console.log("invalid token")
        return req
      }
      req.user = user as JwtPayload;
    });
  }
  return req
};

export const signToken = (username: string, _id: unknown) => {
  const payload = { username, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '2h' });
};
