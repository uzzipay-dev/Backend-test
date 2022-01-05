import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('Authenticate user', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('123456789', 8);

    await connection.query(`
    INSERT INTO users(id, name, email, password, is_admin, created_at)
    Values('${id}', 'admin', 'admin@test.com', '${password}', true, 'now()' )
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should not be able to authenticate user if email is incorrect', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'adminadmin@test.com',
      password: '123456789'
    });

    expect(responseSession.statusCode).toEqual(400);
    expect(responseSession.body.message).toEqual('Email or password incorrect');
  });

  it('should not be able to authenticate user if password is incorrect', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789123456789'
    });

    expect(responseSession.statusCode).toEqual(400);
    expect(responseSession.body.message).toEqual('Email or password incorrect');
  });
});
