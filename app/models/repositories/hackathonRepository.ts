import BaseRepository from './baseRepository';
import {IHackathonRepository} from '../../types';
import {DatabaseTableName} from '../constants/databaseTableNames';
import HackathonEntity from '../entities/hackathonEntity';

export default class HackathonRepository extends BasicRepository<HackathonEntity> implements IHackathonRepository{
    constructor(){
        super(DatabaseTableName.EXAMPLE)
    }
}