const uuid = require('uuidv4');

import * as moment from 'moment';
import {MappedEntityBasicType} from '../types/mappedEntityBasicType';
import {BaseFieldName} from '../constants/fieldNames/baseFieldNames';

export default abstract class basicEntity {
    private _id: string;
    public get id (): string { return this._id; }
    public set id (value: string) { this._id = value; }

    private _createdOn: moment.Moment;
    public get createdOn (): moment.Moment { return this._createdOn; }
    public set createdOn (value: moment.Moment) { this._createdOn = value; }

    private _tableName: string;
    public get tableName () { return this._tableName; }

    public toJSON(): any {
        return {
            id: this._id,
        };
    }
    public fillFromRecord(row: any): void {

        this._id = row[BaseFieldName.ID];
    }
    protected fillRecord(): any {
        return ((this._id && (this._id !== uuid.empty())) ? { [BaseFieldName.ID]: this._id } : {});
    }
    constructor(request?: MappedEntityBasicType, tableName: string = '') {
        //this._isNew = true;
        //this._isDirty = true;
        //this._toUpdateFieldNames = [];
        
        this._tableName = tableName;
        this._id = (request ? request.id : uuid.empty());
        this._createdOn = (request ? request.createdOn : moment());
    }
}

/*
    will need the insert record stuff maybe
*/