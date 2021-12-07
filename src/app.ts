import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello world' });
});

export { app };
