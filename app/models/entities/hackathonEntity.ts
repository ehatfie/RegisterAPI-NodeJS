const uuid = require('uuidv4');
import BasicEntity from './basicEntity';
import {Object} from '../types/object';
import {DatabaseTableName} from '../constants/databaseTableNames';
import {HackathonFieldName} from '../constants/fieldNames/hackathonFieldNames';

export default class HackathonEntity extends BasicEntity {

    private _amount: number;
    public get amount (): number {return this._amount};
    public set amount (value: number) {
        if(this._amount !== value) {
            this._amount = value;
        }
    }
    public toJSON(): Object{
        return new Object(
            super.id, // maybe dont need
            this._amount,
            super.createdOn);
    }
    protected fillRecord(): any {
        var record: any = super.fillRecord();
     
        return record;
    }

    constructor(objectRequest?: Object){
        super(objectRequest, DatabaseTableName.EXAMPLE);

        this._amount = (objectRequest ? objectRequest.amount : -1);
    }
}