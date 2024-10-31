import { HashProvider } from '@/shared/application/providers/hash-provider'
import { compare, hash } from 'bcryptjs'
export class BcryptjsHashProvider implements HashProvider {
  async generateHash(playload: string): Promise<string> {
    return hash(playload, 6)
  }
  async compareHash(playload: string, hash: string): Promise<boolean> {
    return compare(playload, hash)
  }
}
