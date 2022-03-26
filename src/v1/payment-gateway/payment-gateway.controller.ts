import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AuthorizationDto } from './dto/authorization.dto';
import { CaptureDto } from './dto/capture.dto';
import { RefundsDto } from './dto/refunds.dto';
import { ShowRefundsDto } from './dto/ShowRefunds.dto';
import { PaymentGatewayService } from './payment-gateway.service';

@Controller('payment-gateway')
export class PaymentGatewayController {

    constructor(private readonly paymentGatewayService: PaymentGatewayService) {};

    @Post('authorization')
    authorization(@Body() authorizationDto: AuthorizationDto): Promise<any> {
        return this.paymentGatewayService.authorization(authorizationDto);
    }

    @Get('transactions')
    show(@Query() query: string ): Promise<any> {
        return this.paymentGatewayService.show(query);
    }

    @Put('capture/:tid')
    capture(@Param('tid') tid: string, @Body() captureDto: CaptureDto) {
        return this.paymentGatewayService.capture(tid, captureDto);
    }

    @Put('transactions/:id/refunds')
    refunds(@Param('id') id: string, @Body() refundsDto: RefundsDto) {
        return this.paymentGatewayService.refunds(id, refundsDto);
    }

    @Get('transactions/:id/refunds')
    showRefunds(@Param('id') id: string, @Query() showRefunds: ShowRefundsDto) {
        return this.paymentGatewayService.showRefunds(id, showRefunds);
    }


}
