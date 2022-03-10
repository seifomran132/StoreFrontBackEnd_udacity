import jsonwebtoken from 'jsonwebtoken';
import express from 'express';

export function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const authHeader: string | undefined = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : ' ';
    jsonwebtoken.verify(token, process.env.TOKEN as string);
    next();
  } catch (err) {
    res.sendStatus(401);
    next(err);
  }
}
