import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Request } from 'express';
export function hashPassword(password: string): string {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
}

export function verifyPassword(passwordAttempted: string, hashedPassword: string): boolean {
    return compareSync(passwordAttempted, hashedPassword);
}
export interface Result<T> {
    success: boolean;
    data: T;
}

/**
 * Checks if the request body has all required fields.
 * @param request The request to check.
 * @param requiredFields The fields that are required.
 * @param allRequired If true, all required fields must be present. If false, at least one required field must be present.
 * @returns True if the request body has all required fields, false otherwise.
 */

export function checkRequestBody(request: Request, requiredFields: string[], allRequired = true): boolean {
    if (allRequired)
        return requiredFields.every(field => field in request.body);

    return requiredFields.some(field => field in request.body);
}