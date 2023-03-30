import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Request } from 'express';
export function hashPassword(password: string): string {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
}

export function verifyPassword(passwordAttempted : string, hashedPassword : string): boolean {
    return compareSync(passwordAttempted, hashedPassword);
}

export function checkRequestBody(request: Request, requiredFields: string[], allRequired = true): boolean {
    if (allRequired)
		return requiredFields.every(field => field in request.body);

	return requiredFields.some(field => field in request.body);
}