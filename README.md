### Configurations

```
npm i @nestjs/config
npm i @faker-js/faker -D
npm i uuid
npm i @types/uuid -D
npm i bcryptjs
npm i @types/bcryptjs -D
npm i dotenv-cli
```

### Validations

```
npm i class-validator
```

### Docker
docker compose up -d
docker compose ps

### Prisma
npm i prisma -D
npm i @prisma/client

npx prisma init
npx prisma generate --schema ./src/shared/infra/database/prisma/schema.prisma

npx dotenv-cli -e .env.development -- npx prisma migrate reset --schema ./src/shared/infra/database/prisma/schema.prisma

npx dotenv-cli -e .env.development -- npx prisma migrate dev --schema ./src/shared/infra/database/prisma/schema.prisma

npx dotenv-cli -e .env.development -- npx prisma migrate deploy --schema ./src/shared/infra/database/prisma/schema.prisma
