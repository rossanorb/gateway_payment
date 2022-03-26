import { Body, Injectable, HttpService } from '@nestjs/common';
import { AuthorizationDto } from '../../dto/authorization.dto';
import { CaptureDto } from '../../dto/capture.dto';
import { RefundsDto } from '../../dto/refunds.dto';

@Injectable()
export class CieloService {

    private headers: object;
    private apiUrl: string;
    private apiQueryUrl: string;
    private endpoint = '/1/sales/';
    
    constructor(parameters: object, private httpService: HttpService) {
        this.apiUrl = parameters['apiUrl'] + this.endpoint;
        this.apiQueryUrl = parameters['apiQueryUrl'] + this.endpoint;

        this.headers = {
            headers: {
                "Content-Type": 'application/json',
                "MerchantId": parameters['merchantId'],
                "MerchantKey": parameters['merchantKey']                
            }
        };
    }

    async authorization(@Body() authorizationDto: AuthorizationDto): Promise<any> {
        this.headers['headers']['Content-Length'] = JSON.stringify(authorizationDto).length;
        const expiration_date = `${authorizationDto['expiration_month']}/${authorizationDto['expiration_year']}`;
        
        const bodyParameters = {
            MerchantOrderId: authorizationDto['order_id'],
            Payment: {
                capture: authorizationDto['capture'],
                Type: authorizationDto['payment_type'],
                Amount: authorizationDto['amount'],
                Installments: authorizationDto['installments'],
                SoftDescriptor: authorizationDto['soft_descriptor'],
                CreditCard: {
                    CardNumber: authorizationDto['card_number'],
                    Holder: authorizationDto['card_holdername'],
                    ExpirationDate: expiration_date,
                    SecurityCode: authorizationDto['cvv'],
                    Brand: authorizationDto['card_brand']
                }
            }
        };

        const response = await this.httpService.post(this.apiUrl,
            bodyParameters,
            this.headers
        ).toPromise()
            .catch(err => {
                console.log(err)
                return err.response;
            });

        return response.data;
    }

    async show(query: string): Promise<any> {

        const response = await this.httpService.get(
            `${this.apiQueryUrl}${query['tid']}`,
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
        const url = `${this.apiUrl}${tid}/capture?amount=${captureDto['amount']}`;
        const bodyParameters = {};

        const response = await this.httpService.put(url, bodyParameters, this.headers)
            .toPromise()
            .then((res) => {
                return res.data;
            })
            .catch(err => {
                return err.response.data;
            });
        
        return response;

    }

    async refunds(id: string, refundsDto: RefundsDto): Promise<object> {
        const url = `${this.apiUrl}OrderId/${id}/void?amount=${refundsDto['amount']}`;
        const bodyParameters = {};

        const response = await this.httpService.put(url, bodyParameters, this.headers)
            .toPromise()
            .then((res) => {
                return res.data;
            })
            .catch(err => {
                return err.response.data;
            });

        return response;

    }

}
