const uuid = require('uuidv4');
import * as moment from 'moment';

export class MappedEntityBasicType{
    constructor(
        public id: string = uuid.empty()) { }
}