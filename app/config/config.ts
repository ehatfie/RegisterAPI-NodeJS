import {Config} from '../types';

export let settings: Config = {
  name: 'register-service',
  version: '0.0.1',
  port: (isNaN(Number(process.env.PORT)) ? 15150 : Number(process.env.PORT)),
  env: (process.env.NODE_ENV || 'dev'),
  db: {
    host: (process.env.PGHOST || 'localhost'), // Server hosting the postgres database 
    port: (isNaN(Number(process.env.PGPORT)) ? 5432 : Number(process.env.PGPORT)),
    database: (process.env.PGDATABASE || 'dcb0l0qhgjmaao'),
    user: (process.env.PGUSER || 'adqrtfjhpfyzau'),
    password: (process.env.PGPASSWORD || '9854a27bf9d39f239d2303d2ebd7da671cdbe88d13ca8d53a71d1e1700d3a3b6')
  }
};
//test