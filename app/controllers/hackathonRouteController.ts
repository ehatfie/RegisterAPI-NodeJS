import * as restify from 'restify';
import RouteController from './routeController';
import getSales from './commands/hackathon/getSales';
import { IHackathonRepository, CommandResponse } from '../types';
import HackathonRepository from '../models/repositories/hackathonRepository';
import HackathonEntity from '../models/entities/hackathonEntity';

export default class HackathonRouteController extends RouteController{
    public getNumSales(req: restify.Request, res: restify.Response, next: restify.Next){
		HackathonRouteController.hackathonRepository.get(req.params.id)
			.then((hackathonEntity: (HackathonEntity | undefined))=>{
				console.log("aaa");
				if(hackathonEntity){
					res.send(200, hackathonEntity.toJSON()) ;
				} else{
					res.send(404);
				}
				return next();
			}, (reason: any) => {
				return next(new Error(reason.message));
			});
	}
	

	
	private static hackathonRepository: IHackathonRepository = new HackathonRepository;
}
