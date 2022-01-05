import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('Updated product controller', () => {
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

  it('should be able to update the product', async () => {
    const responseSession = await request(app).post('/api/v1/session').send({
      email: 'admin@test.com',
      password: '123456789'
    });

    const { token } = responseSession.body;

    const createdCategory = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test 1'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const createdCategory2 = await request(app)
      .post('/api/v1/categories')
      .send({
        name: 'category test 2'
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const createdProduct = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'product test',
        price: 1000,
        categories_ids: [createdCategory.body.id]
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const updatedProduct = await request(app)
      .patch(`/api/v1/products/${createdProduct.body.id}`)
      .send({
        name: 'updated name',
        price: 2000,
        categories_ids: [createdCategory2.body.id]
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(updatedProduct.status).toEqual(201);
    expect(updatedProduct.body.id).toEqual(createdProduct.body.id);
    expect(updatedProduct.body.name).toEqual('updated name');
    expect(updatedProduct.body.price).toEqual('2000');
    expect(updatedProduct.body.categories).toEqual([createdCategory2.body]);
  });
});
