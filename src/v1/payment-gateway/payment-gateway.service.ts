import { Body, Inject, Injectable } from '@nestjs/common';
import { IpaymentGateway } from './interfaces/ipayment-gateway.interface';
import { AuthorizationDto } from './dto/authorization.dto';
import { CaptureDto } from './dto/capture.dto';
import { RefundsDto } from './dto/refunds.dto';
import { ShowRefundsDto } from './dto/ShowRefunds.dto';

@Injectable()
export class PaymentGatewayService {

    constructor(@Inject('payment-gateway') private paymentGatewayService: IpaymentGateway) { }

    async authorization(@Body() authorizationDto: AuthorizationDto): Promise<string> {
        return this.paymentGatewayService.authorization(authorizationDto);
    }

    async show(tid: string): Promise<any> {
        return this.paymentGatewayService.show(tid);
    }

    capture(tid: string, captureDto: CaptureDto): Promise<object> {
        return this.paymentGatewayService.capture(tid, captureDto);
    }

    refunds(id: string, refundsDto: RefundsDto): Promise<object> {
        return this.paymentGatewayService.refunds(id, refundsDto);
    }

    showRefunds(id: string, showRefundsDto: ShowRefundsDto): Promise<object> {
        return this.paymentGatewayService.showRefunds(id, showRefundsDto);
    }

}
