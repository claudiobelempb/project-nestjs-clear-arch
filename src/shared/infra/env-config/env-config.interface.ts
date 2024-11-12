export interface EnvConfigInterface {
  getAppPort(): number
  getNodeEnv(): string
  getJwtSecret(): string
  getJwtExpiresInSeconds(): number
}
