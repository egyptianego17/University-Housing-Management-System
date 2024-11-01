import * as bcrypt from 'bcrypt';

export class HashUtil {
  static async hashPassword(
    password: string,
  ): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return { hashedPassword, salt };
  }

  static async comparePassword(
    password: string,
    hash: string,
    salt: string,
  ): Promise<boolean> {
    const userEnteredHashedPassword = await bcrypt.hash(password, salt);
    return userEnteredHashedPassword === hash;
  }
}
