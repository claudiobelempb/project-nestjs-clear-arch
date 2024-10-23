import { Module } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserCreateController } from "./controllers/user-create.controller";

@Module({
    imports: [],
    controllers: [UserCreateController],
    providers: [UserService]
})
export class UserModule {}