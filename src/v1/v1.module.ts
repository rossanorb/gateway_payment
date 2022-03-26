import { Module } from '@nestjs/common';
import { V1Controller } from './v1.controller';
import { V1HealthController } from './health/v1.health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ShopkeeperModule } from './shopkeeper/shopkeeper.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';

@Module({
  imports: [TerminusModule, ShopkeeperModule, PaymentGatewayModule],
  controllers: [V1Controller, V1HealthController, V1Controller],
})
export class V1Module {}
