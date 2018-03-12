import * as restify from 'restify';
import RouteController from './routeController';
import getSales from './commands/hackathon/getSales';
import { IHackathonRepository, CommandResponse } from '../types';
import HackathonRepository from '../models/repositories/hackathonRepository';
import HackathonEntity from '../models/entities/hackathonEntity';

export default class HackathonRouteController extends RouteController{
    public getNumSales(req: restify.Request, res: restify.Response, next: restify.Next){
		res.send(200, 'got something') ;
		HackathonRouteController.hackathonRepository.get("1")
			.then((hackathonEntity: (HackathonEntity | undefined))=>{
				if(hackathonEntity){
					res.send(200, 'get something') ;
				} else{
					res.send(404, 'didnt get something');
				}
				return next();
			}, (reason: any) => {
				return next(new Error(reason.message));
			});
	}
	

	
	private static hackathonRepository: IHackathonRepository = new HackathonRepository;
}
/*public getNumSales(req: restify.Request, res: restify.Response, next: restify.Next){
        (new getSales({ hackathonRepository: HackathonRouteController.hackathonRepository}))
            .execute()
            .then((response: CommandResponse) => {
				res.send(response.status, response.data);
				return next();
			}, (reason: CommandResponse) => {
				res.send(reason.status, reason.message);
				return next();
			});
	}
	*/