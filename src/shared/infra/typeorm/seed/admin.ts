import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  const id = uuid();
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const passwordHash = await hash(String(password), 8);

  await connection.query(`
    INSERT INTO users(id, name, email, password, is_admin, created_at)
    Values('${id}', '${name}', '${email}', '${passwordHash}', true, 'now()' )
  `);

  await connection.close();
}

create().then(() => console.log('User admin created!'));
