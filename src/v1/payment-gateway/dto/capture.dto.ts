import { IsEnum, IsInt, Max, Min } from 'class-validator';

import { Gateways } from '../enums/gateway.enum';

export class CaptureDto {

    @IsInt({ message: "Total transaction amount must be informed without thousands and decimal separators" })
    @Max(9999999999, { message: "It has been exceeded the maximum transaction amount" })
    @Min(1, { message: "Total transaction amount can not be zero " })
    readonly amount: number;

    @IsEnum(Gateways, { message: 'The gateway \'$value\' doesn\'t exist' })
    readonly gateway: string;
}