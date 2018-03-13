const uuid = require('uuidv4');
import BasicEntity from './basicEntity';
import {Data} from '../types/object';
import {DatabaseTableName} from '../constants/databaseTableNames';
import {HackathonFieldName} from '../constants/fieldNames/hackathonFieldNames';

export default class HackathonEntity extends BasicEntity {

    private _amount: number;
    public get amount (): number {return this._amount};
    public set amount (value: number) {
        this._amount = value;
    }
    public toJSON(): Data{
        return new Data(
            super.id, // maybe dont need
            this._amount,
            super.createdOn);
    }
    protected fillRecord(): any {
        var record: any = super.fillRecord();
        record[HackathonFieldName.AMOUNT] = this._amount;
     
        return record;
    }

    constructor(dataRequest?: Data){
        super(dataRequest, DatabaseTableName.EXAMPLE);

        this._amount = (dataRequest ? dataRequest.amount : -1);
    }
}