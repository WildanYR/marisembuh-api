import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashUtility {
  async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }

  async compare(text: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(text, hashedText);
  }
}
