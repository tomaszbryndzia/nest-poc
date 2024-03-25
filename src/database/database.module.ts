import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-round-mud-a2bl7r3m-pooler.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'test-project_owner',
      password: 'zihl3ryPdB2S',
      database: 'test-project',
      entities: [User],
      synchronize: true,
      ssl: true,
      autoLoadEntities: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
})
export class DatabaseModule {}
