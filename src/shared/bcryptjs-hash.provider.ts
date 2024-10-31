import { compare, hash } from 'bcryptjs'
import { HashProvider } from './application/providers/hash-provider'
export class BcryptjsHashProvider implements HashProvider {
  async generateHash(playload: string): Promise<string> {
    return hash(playload, 6)
  }
  async compareHash(playload: string, hash: string): Promise<boolean> {
    return compare(playload, hash)
  }
}
