import * as crypto from 'crypto';

export class EncryptionUtil {
  private static algorithm = 'aes-256-cbc';
  private static secretKey = process.env.ENCRYPTION_KEY;

  private static getValidatedSecretKey(): Buffer {
    if (!this.secretKey || this.secretKey.length !== 32) {
      throw new Error(
        'Invalid ENCRYPTION_KEY: it must be exactly 32 characters.',
      );
    }
    return Buffer.from(this.secretKey);
  }

  static async encryptPayload(email: string, role: string): Promise<string> {
    const payload = JSON.stringify({ email, role });
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.getValidatedSecretKey(),
      iv,
    );

    let encrypted = cipher.update(payload, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  }

  static async decryptPayload(
    encryptedPayload: string,
  ): Promise<{ email: string; role: string }> {
    const [ivHex, encrypted] = encryptedPayload.split(':');

    if (!ivHex || ivHex.length !== 32 || !encrypted) {
      throw new Error('Invalid encrypted payload format or missing IV');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.getValidatedSecretKey(),
      iv,
    );

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return JSON.parse(decrypted);
  }
  static async encryptId(id: number): Promise<string> {
    const payload = JSON.stringify({ id });
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.getValidatedSecretKey(),
      iv,
    );

    let encrypted = cipher.update(payload, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  }
  static async decryptId(encryptedId: string): Promise<number> {
    const [ivHex, encrypted] = encryptedId.split(':');

    if (!ivHex || ivHex.length !== 32 || !encrypted) {
      throw new Error('Invalid encrypted payload format or missing IV');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.getValidatedSecretKey(),
      iv,
    );

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return JSON.parse(decrypted).id;
  }
}
