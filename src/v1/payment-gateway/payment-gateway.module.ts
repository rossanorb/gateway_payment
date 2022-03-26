import { HttpModule, Module } from '@nestjs/common';
import { PaymentGatewayController } from './payment-gateway.controller';
import { PaymentGatewayService } from './payment-gateway.service';
import PaymentGatewayProvider from "./payment-gateway.provider";
import { ConfigModule } from '@nestjs/config';
import env from './env';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [env]
        }),

        HttpModule.register({
            timeout: 5000
        })
    ],
    controllers: [PaymentGatewayController],
    providers: [
        PaymentGatewayService,
        PaymentGatewayProvider
    ]
})
export class PaymentGatewayModule { }
