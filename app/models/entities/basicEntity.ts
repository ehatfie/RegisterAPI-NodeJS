const uuid = require('uuidv4');

import {MappedEntityBasicType} from '../types/mappedEntityBasicType';

export default abstract class basicEntity {
    private _id: string;
    public get id (): string { return this._id; }
    public set id (value: string) { this._id = value; }

    private _tableName: string;
    public get tableName () { return this._tableName; }

    public toJSON(): any {
        return {
            id: this._id,
        };
    }

    constructor(request?: MappedEntityBasicType, tableName: string = '') {
        //this._isNew = true;
        //this._isDirty = true;
        //this._toUpdateFieldNames = [];
        
        this._tableName = tableName;
        this._id = (request ? request.id : uuid.empty());
        //this._createdOn = (request ? request.createdOn : moment());
    }
}

/*
    will need the insert record stuff maybe
*/