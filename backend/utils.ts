import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export function hashPassword(password: string): string {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
}

export function verifyPassword(passwordAttempted : string, hashedPassword : string): boolean {
    return compareSync(passwordAttempted, hashedPassword);
}
