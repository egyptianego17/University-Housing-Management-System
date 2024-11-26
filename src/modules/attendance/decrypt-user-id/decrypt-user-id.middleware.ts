import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EncryptionUtil } from 'src/utils/encryption.util';

@Injectable()
export class DecryptUserIdMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.userId = await EncryptionUtil.decryptId(req.body.userId);
      next();
    } catch (error) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
  }
}
