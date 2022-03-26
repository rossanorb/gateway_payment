import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';

import { Gateways } from '../../enums/gateway.enum';

@ValidatorConstraint({ async: true })
export class IsValidInstallmentsContraint implements ValidatorConstraintInterface {
    validate(installments: number, args: ValidationArguments) {
        const gateway = args.object['gateway'];
        Number(installments);

        if (gateway === Gateways.cielo) {
            if (installments > 0 && installments < 100) {
                return true;
            }
            return false;
        }

        if (gateway === Gateways.erede) {
            if (!installments || (installments > 1 && installments <= 12)) {
                return true;
            }
            return false;
        }

        return true;
    }
}

export function IsValidInstallments(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidInstallmentsContraint
        })
    }
}