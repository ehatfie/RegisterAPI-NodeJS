import BasicRepository from './basicRepository';
import {IHackathonRepository} from '../../types';
import {DatabaseTableName} from '../constants/databaseTableNames';
import HackathonEntity from '../entities/hackathonEntity';

export default class HackathonRepository extends BasicRepository<HackathonEntity> implements IHackathonRepository{
    constructor(){
        super(DatabaseTableName.EXAMPLE)
    }

    protected createOne(row: any): HackathonEntity {
        var entity = new HackathonEntity();
        entity.fillFromRecord(row);
        return entity;
    }
}
