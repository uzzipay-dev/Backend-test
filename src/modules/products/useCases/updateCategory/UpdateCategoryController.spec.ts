import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('Updated category controller', () => {
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

  it('should be able to update category name', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = responseSession.body;

    const createdCategory = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const updatedCategory = await request(app)
      .patch(`/api/v1/categories/${createdCategory.body.id}`)
      .send({
        name: 'updated name'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(updatedCategory.status).toEqual(201);
    expect(updatedCategory.body.id).toEqual(createdCategory.body.id);
    expect(updatedCategory.body.name).toEqual('updated name');
  });
});
