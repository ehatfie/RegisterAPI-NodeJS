const uuid = require('uuidv4');
import * as moment from 'moment';
import {MappedEntityBasicType} from './mappedEntityBasicType';

export class Data extends MappedEntityBasicType{
    constructor(
        public id: string = uuid.empty(),
        public amount: number = 0,
        public createdOn: moment.Moment = moment()) {
            super(id, createdOn);
    }
    
}