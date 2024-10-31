export interface HashProvider {
  generateHash(playload: string): Promise<string>
  compareHash(playload: string, hash: string): Promise<boolean>
}
