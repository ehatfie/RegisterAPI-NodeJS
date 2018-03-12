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
}

private _hackathonRepository: IHackathonRepository;
public get hackathonRepository (): IHackathonRepository { return this._hackathonRepository; }
public set hackathonRepository (value: IHackathonRepository) {this._hackathonRepository = value; }

constructor({ hackathonRepository = new HackathonRepository() }: any = {}) {
    this._hackathonRepository = hackathonRepository;
}