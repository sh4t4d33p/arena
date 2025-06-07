/**
 * Ethereum Address Validator
 * 
 * Custom validator for checking if a string is a valid Ethereum address.
 * Uses the IsEthereumAddress decorator for validation.
 * 
 * @class IsEthereumAddressConstraint
 */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { IsEthereumAddress } from '@/auth/decorators/is-ethereum-address.decorator';

/**
 * Ethereum Address Validator
 * 
 * @class IsEthereumAddressConstraint
 * @description Custom validator for Ethereum addresses
 */
export function IsEthereumAddressConstraint(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    /**
     * Registers the Ethereum address validator
     * 
     * @param target Target class
     * @param property Property name to validate
     * @param options Validation options
     */
    registerDecorator({
      name: 'isEthereumAddress',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        /**
         * Validates if the value is a valid Ethereum address
         * 
         * @param value Value to validate
         * @param args Validation arguments
         * @returns Always returns true since the decorator throws on invalid
         */
        validate(value: any, args: ValidationArguments) {
          const decorator = IsEthereumAddress();
          decorator(object, propertyName);
          return true; // Always return true since the decorator throws on invalid
        },
        /**
         * Returns default error message for invalid Ethereum addresses
         * 
         * @param args Validation arguments
         * @returns Error message string
         */
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Ethereum address`;
        },
      },
    });
  };
}
