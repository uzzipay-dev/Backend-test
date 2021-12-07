import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';

import createConnection from './shared/infra/typeorm';

createConnection();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello world' });
});

export { app };
