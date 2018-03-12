import * as restify from 'restify';
import hackathonRouteController from '../controllers/hackathonRouteController'

function hackathonRoute(server: restify.Server) {
    let routeController = new hackathonRouteController();

/*
    server.get({ path: '/api/hackathon/', version: '0.0.1'}, (req: restify.Request, res: restify.Response, next: restify.Next) => {
        res.send(200, 'Successful test. (Product routing).');
    });
    */
    server.get({ path: '/api/hackathon/', version: '0.0.1'}, routeController.getNumSales);


}

module.exports.routes = hackathonRoute;