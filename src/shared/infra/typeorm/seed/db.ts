import createConnection from '../index';

async function createDataBaseTest() {
  const connection = await createConnection();

  const databaseName = process.env.TYPEORM_DATABASE_TEST;

  await connection.query(`CREATE DATABASE ${databaseName}`);

  await connection.close();
}

createDataBaseTest().then(() => console.log('Create database test'));
