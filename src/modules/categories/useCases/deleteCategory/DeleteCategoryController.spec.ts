import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('Delete category controller', () => {
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

  it('should be able to delete a category', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = responseSession.body;

    const categoryCreated = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(categoryCreated.statusCode).toEqual(201);

    const deleteCategory = await request(app)
      .delete(`/api/v1/categories/${categoryCreated.body.id}`)
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(deleteCategory.statusCode).toEqual(202);
  });
});
