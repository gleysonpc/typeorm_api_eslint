require('dotenv/config');
const env = process.env.NODE_ENV;

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'admin',
  synchronize: true,
  logging: false,
  entities: [env == 'dev' ? 'src/models/**/*.ts' : 'dist/models/**/*.js'],
  migrations: ['src/database/migration/**/*.ts'],
  subscribers: ['src/database/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber'
  }
};
