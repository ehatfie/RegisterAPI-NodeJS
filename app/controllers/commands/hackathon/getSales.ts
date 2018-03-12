import HackathonEntity from '../../../models/entities/hackathonEntity';
import {CommandResponse, IHackathonRepository} from '../../../types';
import HackathonRepository from '../../../models/repositories/hackathonRepository';

export default class getSales{
    public execute(): Promise<CommandResponse> {
        var self = this;
        return new Promise<CommandResponse>((resolveToRouter, rejectToRouter) =>{
            rejectToRouter({ status: 500, message:"sorry", data:{} });
        });
    }


    private _hackathonRepository: IHackathonRepository;
    //public get hackathonRepository (): any { return this._basicRepository; }
    //public set hackathonRepository (value: any) {this._basicRepository = value; }

    constructor({hackathonRepository = new hackathonRepository() }: any = {}){ 
    }
}