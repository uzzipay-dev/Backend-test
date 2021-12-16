import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('Create product controller', () => {
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

  it('should be possible to delete a product by id', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = responseSession.body;

    const productCreated = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test',
        price: 1000,
        category: 'category test'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const deleteProduct = await request(app)
      .delete(`/api/v1/products/${productCreated.body.id}`)
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(deleteProduct.statusCode).toEqual(202);
  });

  it('should not be possible to delete a product if id is not found', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = responseSession.body;

    const deleteProduct = await request(app)
      .delete(`/api/v1/products/8d7c44e2-c5a0-4091-8cb9-311755be62f2`)
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(deleteProduct.statusCode).toEqual(400);
    expect(deleteProduct.body.message).toEqual('Product not found');
  });
});
