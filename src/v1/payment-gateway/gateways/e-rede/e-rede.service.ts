import { Body, Injectable, HttpService } from '@nestjs/common';

import { AuthorizationDto } from '../../dto/authorization.dto';
import { CaptureDto } from '../../dto/capture.dto';
import { RefundsDto } from '../../dto/refunds.dto';
import { ShowRefundsDto } from '../../dto/ShowRefunds.dto';

@Injectable()
export class ERedeService {

    private headers: object;
    private url: string;
    private endpoint = '/v1/transactions/';
    
    constructor(parameters: object, private httpService: HttpService ) {
        const token: string = Buffer.from(`${parameters['pv']}:${parameters['token']}`).toString('base64');
        this.url = parameters['url'] + this.endpoint;

        this.headers = {
            headers: {
                "Authorization": `basic ${token}`,
                "Content-Type": "application/json"                
            }
        };
    }

    async authorization(@Body() authorizationDto: AuthorizationDto): Promise<any> {
        // this.headers['headers']['Content-Length'] = JSON.stringify(authorizationDto).length;

        const bodyParameters = {
            capture: authorizationDto['capture'],
            reference: authorizationDto['order_id'],
            amount: authorizationDto['amount'],
            cardholderName: authorizationDto['card_holdername'],
            cardNumber: authorizationDto['card_number'],
            expirationMonth: authorizationDto['expiration_month'],
            expirationYear: authorizationDto['expiration_year'],
            securityCode: authorizationDto['cvv'],
        };

        return await this.httpService.post(this.url,
            bodyParameters,
            this.headers
        ).toPromise()
            .then(res => res.data)
            .catch(err => err.response.data);
    }

    async show(query: string): Promise<any> {

        const response = await this.httpService.get(
            `${this.url}${query['tid']}`,
            this.headers
        ).toPromise()
        .then((res) => {        
            return res.data;
        })
        .catch(err => {
            return err.response.data;
        });
        
        return response;
    }

    async capture(tid: string, captureDto: CaptureDto): Promise<any> {
                
        const bodyParameters = {
            amount: captureDto['amount']
        };

        const response = await this.httpService.put(this.url + tid,
            bodyParameters,
            this.headers
        ).toPromise()
            .then((res) => {
                return res.data;
            })
            .catch(err => {
                return err.response.data;
            });
        
        return response;
    }

    async refunds(id: string, refundsDto: RefundsDto): Promise<object> {

        const bodyParameters = {
            amount: refundsDto['amount']
        };

        const response = await this.httpService.post(`${this.url}${id}/refunds`,
            bodyParameters,
            this.headers
        ).toPromise()
            .then((res) => {
                return res.data;
            })
            .catch(err => {
                return err.response.data;
            });

        return response;
    }

    async showRefunds(id: string, showRefundsDto: ShowRefundsDto): Promise<void> {
        const url = `${this.url}${id}/refunds`;

        const response = await this.httpService.get(
            url, this.headers
        ).toPromise()
            .then((res) => {
                return res.data;
            })
            .catch(err => {
                return err.response.data;
            });

        return response;
    }

}
