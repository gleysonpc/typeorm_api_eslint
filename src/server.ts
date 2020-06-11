import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';

import app from './app';

dotenv.config();
createConnection();

function run() {
  app.listen(process.env.PORT || 3333);
}

run();
