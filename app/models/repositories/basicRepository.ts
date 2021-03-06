import BasicEntity from '../entities/basicEntity';
import {IBasicRepository} from '../../types';
import db = require('./helpers/databaseConnection');
import JoinContainer from './helpers/join/JoinContainer';
import {SQLKeyword} from '../constants/sql/keywords';
import WhereClause from './helpers/where/WhereClause';
import OrderByContainer from './helpers/orderBy/OrderByContainer';
import WhereContainer from './helpers/where/WhereContainer';
import {BasicFieldName} from '../constants/fieldNames/basicFieldNames';
import {PostgreType} from '../constants/sql/postgreTypes';
import {SQLComparison} from '../constants/sql/comparisons';

export default abstract class BasicRepository<T extends BasicEntity> implements IBasicRepository<T> {
    private _tableName: string;
    get tableName (): string { return this._tableName; }

    protected abstract createOne(row: any): T;
    
    public get(id: string): Promise<T | undefined> {
        return this.firstOrDefaultWhere(
            this.buildByIdParameters(id)
        );
    }

    protected firstOrDefaultWhere({ joinContainers = [], whereContainer = undefined, orderByContainers = [], values = undefined }: any = {}): Promise<T | undefined> {
        return this.queryFirstOrDefault(
            this.buildSelectQuery([ this.buildDefaultProjection() ], joinContainers, whereContainer, orderByContainers, 1, BasicRepository._invalidIndex)
            , values
        )
    }

    protected buildSelectQuery(projections: string[], joins: JoinContainer[], where: WhereContainer | undefined, orderBys: OrderByContainer[], limit: number, offset: number): string {
        return (
            SQLKeyword.SELECT + SQLKeyword.SPACE + projections.join()
            + this.buildFromAndWhereClause(joins, where, orderBys, limit, offset)
        );
    }

    protected buildDefaultProjection(): string {
        return (this._tableName + SQLKeyword.TABLE_FIELD_SEPARATOR + SQLKeyword.PROJECTION_ALL);
    }

    protected buildFromAndWhereClause(joins: JoinContainer[], where: WhereContainer | undefined, orderBys: OrderByContainer[], limit: number, offset: number): string {
        var fromAndWhereClause: string = (SQLKeyword.SPACE + SQLKeyword.FROM + SQLKeyword.SPACE + this._tableName);

        joins.forEach((joinTo: JoinContainer) => {
            fromAndWhereClause += joinTo.toString();
        }, this);

        if (where) {
            fromAndWhereClause += where.toString();
        }

        orderBys.forEach((orderBy: OrderByContainer) => {
            fromAndWhereClause += orderBy.toString();
        }, this);

        if (limit > 0) {
            fromAndWhereClause += (SQLKeyword.SPACE + SQLKeyword.LIMIT + SQLKeyword.SPACE + limit);
        }

        if (offset > 0) {
            fromAndWhereClause += (SQLKeyword.SPACE + SQLKeyword.OFFSET + SQLKeyword.SPACE + offset);
        }

        return fromAndWhereClause;
    }
    protected buildByIdParameters(id: string): any {
        return {
            whereContainer: new WhereContainer({
                whereClauses: [
                    new WhereClause({
                        tableName: this._tableName,
                        fieldName: BasicFieldName.ID,
                        fieldType: PostgreType.INT,
                        comparison: SQLComparison.EQUALS
                    })
                ]
            })
            , values: { [this._tableName + BasicFieldName.ID]: id }
        };
    }

    protected queryFirstOrDefault(query: string, values: any): Promise<T | undefined> {
        var self: BasicRepository<T> = this;

        return new Promise(function(resolveToController, rejectToController) {
            db.oneOrNone(query, values)
                .then((data: any) => {
                        resolveToController(data ? self.createOne(data) : undefined);
                    }, (reason: any) => {
                        rejectToController(reason);
                    });
        });
    }

    protected queryAll(query: string, values: any): Promise<T[]> {
        var self: BasicRepository<T> = this;

        return new Promise(function(resolveToController, rejectToController) {
            db.any(query, values)
                .then((data: any) => {
                        var results: T[] = [];
                        for (var i = 0; i < data.length; i++) {
                            results.push(
                                self.createOne(data[i])
                            );
                        }
    
                        resolveToController(results);
                    }, (reason: any) => {
                        rejectToController(reason);
                    });
        });
    }

    private static _invalidIndex: number = -1;
    
    constructor(tableName: string){
        this._tableName = tableName;
    }
   
}


/* protected abstract createOne(row: any): T;

    public all(): Promise<T[]> {
        return this.allWhere();
    }

    protected allWhere({ joinContainers = [], whereContainer = undefined, orderByContainers = [], limit = BasicRepository._invalidIndex, offset = BasicRepository._invalidIndex, values = undefined }: any = {}): Promise<T[]> {
        return this.queryAll(
            this.buildSelectQuery([ this.buildDefaultProjection() ], joinContainers, whereContainer, orderByContainers, limit, offset)
            , values
        )
    }

    protected buildSelectQuery(projections: string[], joins: JoinContainer[], where: WhereContainer | undefined, orderBys: OrderByContainer[], limit: number, offset: number): string {
        return (
            SQLKeyword.SELECT + SQLKeyword.SPACE + projections.join()
            + this.buildFromAndWhereClause(joins, where, orderBys, limit, offset)
        );
    }

    protected buildFromAndWhereClause(joins: JoinContainer[], where: WhereContainer | undefined, orderBys: OrderByContainer[], limit: number, offset: number): string {
        var fromAndWhereClause: string = (SQLKeyword.SPACE + SQLKeyword.FROM + SQLKeyword.SPACE + this._tableName);

        joins.forEach((joinTo: JoinContainer) => {
            fromAndWhereClause += joinTo.toString();
        }, this);

        if (where) {
            fromAndWhereClause += where.toString();
        }

        orderBys.forEach((orderBy: OrderByContainer) => {
            fromAndWhereClause += orderBy.toString();
        }, this);

        if (limit > 0) {
            fromAndWhereClause += (SQLKeyword.SPACE + SQLKeyword.LIMIT + SQLKeyword.SPACE + limit);
        }

        if (offset > 0) {
            fromAndWhereClause += (SQLKeyword.SPACE + SQLKeyword.OFFSET + SQLKeyword.SPACE + offset);
        }

        return fromAndWhereClause;
    }

    protected buildDefaultProjection(): string {
        return (this._tableName + SQLKeyword.TABLE_FIELD_SEPARATOR + SQLKeyword.PROJECTION_ALL);
    }

    protected queryAll(query: string, values: any): Promise<T[]> {
        var self: BasicRepository<T> = this;

        return new Promise(function(resolveToController, rejectToController) {
            db.any(query, values)
                .then((data: any) => {
                        var results: T[] = [];
                        for (var i = 0; i < data.length; i++) {
                            results.push(
                                self.createOne(data[i])
                            );
                        }

                        resolveToController(results);
                    }, (reason: any) => {
                        rejectToController(reason);
                    });
        });
    }

    private static _invalidIndex: number = -1;
    private static _existsSelectCount: string = '1';

    constructor(tableName: string){
        this._tableName = tableName;
    }
    */