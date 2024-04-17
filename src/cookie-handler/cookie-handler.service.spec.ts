import { Test, TestingModule } from '@nestjs/testing';
import { CookieHandlerService } from './cookie-handler.service';

describe('CookieHandlerService', () => {
  let service: CookieHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookieHandlerService],
    }).compile();

    service = module.get<CookieHandlerService>(CookieHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
