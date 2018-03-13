import BasicEntity from './models/entities/basicEntity';
import HackathonEntity from './models/entities/hackathonEntity';

export interface Config {
  name: string;
  port: number;
  env: string;
  version: string;
  db: DBConfig;
}

export interface DBConfig {
  host: string,
  port: number,
  database: string,
  user: string,
  password: string
}

export interface CommandResponse {
  status: number,
  message: string,
  data: any
}

export interface IBasicRepository<T extends BasicEntity> {
 get(id: string): Promise<T | undefined>;
}

export interface IHackathonRepository extends IBasicRepository<HackathonEntity>{
}

