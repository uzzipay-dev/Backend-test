import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('List products by categories', () => {
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

  it('should be able list products by category', async () => {
    const createSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = createSession.body;

    const createdCategory1 = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test 1'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const createdProduct1 = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test 1',
        price: 1000,
        categories_ids: [createdCategory1.body.id]
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const createdProduct2 = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test 2',
        price: 1000,
        categories_ids: [createdCategory1.body.id]
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const response = await request(app).post(
      `/api/v1/categories/${createdCategory1.body.id}`
    );

    const products = [
      {
        id: createdProduct1.body.id,
        name: createdProduct1.body.name,
        price: createdProduct1.body.price,
        created_at: createdProduct1.body.created_at
      },
      {
        id: createdProduct2.body.id,
        name: createdProduct2.body.name,
        price: createdProduct2.body.price,
        created_at: createdProduct2.body.created_at
      }
    ];

    expect(response.statusCode).toEqual(200);
    expect(response.body.id).toEqual(createdCategory1.body.id);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.products).toEqual(products);
  });
});
