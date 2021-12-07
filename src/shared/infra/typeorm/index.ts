/* eslint-disable no-return-await */
import { createConnection, Connection } from 'typeorm';

export default async (): Promise<Connection> => {
  return await createConnection();
};
