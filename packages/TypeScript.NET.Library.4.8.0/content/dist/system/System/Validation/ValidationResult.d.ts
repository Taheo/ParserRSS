import { IEquatable } from "../IEquatable";
import { IValidationResult } from "./IValidationResult";
/**
 * A class for generating responses to validation.
 */
export default class ValidationResult implements IValidationResult, IEquatable<IValidationResult> {
    readonly isValid: boolean;
    readonly message: string;
    readonly data: any;
    /**
     * Allows for rare cases that ValidationResult.valid and ValidationResult.invalid() don't cover.
     */
    constructor(isValid?: boolean, message?: string, data?: any);
    /**
     * Allows for comparing another IValidationResult to see if they are equal.
     */
    equals(other: IValidationResult): boolean;
    /**
     * Represents a single/shared instance of a valid result.
     * Allows for returning this instance like you would return 'true'.
     */
    static readonly valid: IValidationResult;
    /**
     * Factory method for easily creating an invalid result.
     */
    static invalid(message: string, data?: any): IValidationResult;
}
