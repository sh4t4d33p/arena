/**
 * Ethereum Address Decorator
 * 
 * Custom decorator for validating Ethereum addresses.
 * Checks if a string is a valid Ethereum address format.
 * 
 * @class IsEthereumAddress
 */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Ethereum Address Decorator
 * 
 * @class IsEthereumAddress
 * @description Custom decorator for Ethereum address validation
 */
export function IsEthereumAddress(validationOptions?: ValidationOptions) {
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
         * @returns True if valid Ethereum address, false otherwise
         */
        validate(value: any) {
          if (!value) {
            return false;
          }
          // Simple Ethereum address validation
          return typeof value === 'string' && 
            value.length === 42 && 
            value.toLowerCase().startsWith('0x') &&
            /^[0-9a-fA-F]+$/.test(value.slice(2));
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
