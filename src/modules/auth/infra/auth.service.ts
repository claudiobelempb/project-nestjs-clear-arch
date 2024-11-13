import { EnvConfigService } from '@/shared/infra/env-config/env-config.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export type GenarateJwtProps = {
  accessToken: string
}
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  async generateJwt(userId: string): Promise<GenarateJwtProps> {
    const accessToken = await this.jwtService.signAsync({ id: userId }, {})
    // console.log(accessToken)
    return { accessToken }
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.envConfigService.getJwtSecret(),
    })
  }
}
