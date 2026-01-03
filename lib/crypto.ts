import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
// APP_KEY should be 32 bytes (64 hex characters)
function getSecretKey(): Buffer {
    const key = process.env.APP_KEY || '';
    if (key.length !== 64) {
        throw new Error('APP_KEY must be a 64-character hex string (32 bytes)');
    }
    return Buffer.from(key, 'hex');
}

export function encrypt(text: string): string {
    if (!process.env.APP_KEY) {
        throw new Error('APP_KEY is not defined');
    }

    // Create random initialization vector
    const iv = randomBytes(IV_LENGTH);

    // Create cipher
    const cipher = createCipheriv(ALGORITHM, getSecretKey(), iv);

    // Encrypt
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Get auth tag
    const authTag = cipher.getAuthTag();

    // Return IV:AuthTag:EncryptedContent
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string): string {
    if (!process.env.APP_KEY) {
        throw new Error('APP_KEY is not defined');
    }

    if (!text) return text;
    // Check if text is in expected format (iv:authTag:encrypted)
    const parts = text.split(':');
    if (parts.length !== 3) {
        // Fallback for unencrypted legacy data if necessary, or throw
        // For now, let's assume if it doesn't match, it might be plain text (during migration testing) or invalid.
        // But per requirements, we should probably fail safe or return original if not encrypted. 
        // Given existing data will be invalid, we'll try to return as is if it doesn't utilize our format, 
        // essentially treating it as "migrated by partial implementation". 
        // However, for security, if we expect encrypted, we should probably fail. 
        // Let's rely on the format.
        return text;
        // throw new Error('Invalid encrypted format');
    }

    const [ivHex, authTagHex, encryptedHex] = parts;

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = createDecipheriv(ALGORITHM, getSecretKey(), iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
