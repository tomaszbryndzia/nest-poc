import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module'; // Adjust this path to your AppModule's path

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  const loginAndGetJWT = async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@xxxx.com', password: 'test' })
      .expect(HttpStatus.CREATED);

    authToken = response.body.access_token;
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    await loginAndGetJWT();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return an array of users with valid authentication', () => {
    console.log('no mam', authToken);
    return request(app.getHttpServer())
      .get('/users')
      .set('access_token', authToken)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });
  // });
  // it('/ (GET)', () => {
  //   console.log(3);
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  // More test cases can be added below, using the authToken as needed
});
