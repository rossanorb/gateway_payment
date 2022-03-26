import { IsEnum, IsInt, IsNotEmpty, Max } from 'class-validator';
import { Gateways } from '../enums/gateway.enum';

export class ShowRefundsDto {

    @IsEnum(Gateways, { message: 'The gateway \'$value\' doesn\'t exist' })
    readonly gateway: string;
}