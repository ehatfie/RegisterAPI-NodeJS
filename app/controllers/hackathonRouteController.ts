import * as restify from 'restify';
import RouteController from './routeController';
import getSales from './commands/hackathon/getSales';

export default class HackathonRouteController extends RouteController{
    public getNumSales(req: restify.Request, res: restify.Response, next: restify.Next){
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
}