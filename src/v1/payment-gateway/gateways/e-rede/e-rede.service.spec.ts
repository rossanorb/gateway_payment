import { Test, TestingModule } from '@nestjs/testing';
import { ERedeService } from './e-rede.service';

describe('ERedeService', () => {
  let service: ERedeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ERedeService],
    }).compile();

    service = module.get<ERedeService>(ERedeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
