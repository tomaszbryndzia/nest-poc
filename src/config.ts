export const config = () => {
  return {
    jwtSecret: process.env.JWT_SECRET_KEY,
    database: {
      type: 'postgres',
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts}'],
      synchronize: true,
      ssl: true,
      autoLoadEntities: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
  };
};
