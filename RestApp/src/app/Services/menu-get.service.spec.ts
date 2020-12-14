import { TestBed } from '@angular/core/testing';

import { MenuGetService } from './menu-get.service';

describe('MenuGetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuGetService = TestBed.get(MenuGetService);
    expect(service).toBeTruthy();
  });
});
