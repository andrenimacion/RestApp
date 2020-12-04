import { TestBed } from '@angular/core/testing';

import { MesasControllerService } from './mesas-controller.service';

describe('MesasControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MesasControllerService = TestBed.get(MesasControllerService);
    expect(service).toBeTruthy();
  });
});
