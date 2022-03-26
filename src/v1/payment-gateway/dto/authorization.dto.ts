import {
    IsBoolean, IsCreditCard, IsEnum, IsInt, IsOptional, IsString, Length, Max, MaxLength, Min, ValidateIf
} from 'class-validator';

import { Gateways } from '../enums/gateway.enum';
import { IsPaymentType } from './validators/payment-type';
import { IsValidInstallments } from './validators/installments';

const erede = (o: any): boolean => {
    return o.gateway === 'erede';;
}

const cielo = (o: any): boolean => {
    return o.gateway === 'cielo';
}

export class AuthorizationDto {
       
    //@ValidateIf(o => erede(o))
    @IsOptional()
    @IsBoolean()
    readonly capture: boolean;

    @IsPaymentType({message: 'Payment type $value is invalid.'})
    readonly payment_type: string;
    
    @MaxLength(16, {message: "Order Id must be shorter than or equal to 16 characters"})
    readonly order_id: string;

    @IsInt({ message: "Total transaction amount must be informed without thousands and decimal separators"})
    @Max(9999999999, { message: "It has been exceeded the maximum transaction amount"})
    readonly amount: number;

    @IsValidInstallments({message: 'The number of installments are invalid.'})
    readonly installments: number;
       
    @Length(3, 30)
    readonly card_holdername: string;

    @IsString()
    @IsCreditCard()
    readonly card_number: string;

    @Min(1, { message: "Date is invalid" })
    @Max(12, { message: "Date is invalid" })
    readonly expiration_month: string;
    
    @Min((new Date()).getFullYear(), {message: "Date is invalid"})
    readonly expiration_year: number;

    @Length(3, 4, { message: "Security Code is invalid" })
    readonly cvv: string;

    @MaxLength(10, { message: "card brand is invalid" })
    readonly card_brand: string;
    
    @IsOptional()
    @MaxLength(13)
    readonly soft_descriptor: string;

    @IsEnum(Gateways, { message: 'The gateway \'$value\' doesn\'t exist' })
    readonly gateway: string;
}
