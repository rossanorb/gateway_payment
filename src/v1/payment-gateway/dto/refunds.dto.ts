import { IsEnum, IsInt, Max } from 'class-validator';
import { Gateways } from '../enums/gateway.enum';

export class RefundsDto {

    @IsInt({ message: "Total transaction amount must be informed without thousands and decimal separators" })
    @Max(9999999999, { message: "It has been exceeded the maximum transaction amount" })
    readonly amount: number;
    
    @IsEnum(Gateways, { message: 'The gateway \'$value\' doesn\'t exist' })
    readonly gateway: string;
}