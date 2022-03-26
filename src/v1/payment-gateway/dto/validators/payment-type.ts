import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';

import { paymentTypeRede, paymentTypeCielo } from '../../enums/paymenttype.enum';
import { Gateways } from '../../enums/gateway.enum';

@ValidatorConstraint({ async: true })
export class IsPaymentTypeConstraint implements ValidatorConstraintInterface {
    validate(paymentType: any, args: ValidationArguments) {
        const gateway = args.object['gateway'];

        if (gateway === Gateways.cielo) {
            if (Object.values(paymentTypeCielo).includes(paymentType) && paymentType.length <= 100) {
                return true;
            }
            return false;
        }

        if (gateway === Gateways.erede) {
            if (paymentType == '' || Object.values(paymentTypeRede).includes(paymentType)) {
                return true;
            }
            return false;
        }

        return true;
    }

}

export function IsPaymentType(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPaymentTypeConstraint
        });
    };
}