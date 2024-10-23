import { Controller, Get } from "@nestjs/common";
import { UserService } from "../user.service";

@Controller('users')
export class UserCreateController {
    constructor(private readonly userService: UserService) {}

    @Get()
    handle(): string {
      return 'ok';
    }
}