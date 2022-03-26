import { Scope, HttpService } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CieloService } from './gateways/cielo/cielo.service';
import { ERedeService } from './gateways/e-rede/e-rede.service';
import { ConfigService } from '@nestjs/config';
import { Gateways } from './enums/gateway.enum';

export default {
    provide: 'payment-gateway',
    scope: Scope.REQUEST,
    useFactory: (request: Request, configService: ConfigService) => {

        let service: string = '';

        switch (request.method) {
            case 'GET':
            case 'DELETE':
                service = request['query']['gateway'];
                break;
            
            case 'PATCH':
            case 'POST':
            case 'PUT':
                service = request.body['gateway'];
                break;
        
            default:
                console.log(`Falha ao localizar o serviço ${service}`);
                break;
        }        
        
        const httpService: HttpService = new HttpService();        
        const configs: object = configService.get('configPaymentGateway');
        const parameters: object = configs[service];

        switch (service) {
            case Gateways.erede: return new ERedeService(parameters, httpService);
            case Gateways.cielo: return new CieloService(parameters, httpService);
        }
    },
    inject: [REQUEST, ConfigService],
};