/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RamschemaService } from './ramschema.service';

describe('Service: Ramschema', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RamschemaService]
    });
  });

  it('should ...', inject([RamschemaService], (service: RamschemaService) => {
    expect(service).toBeTruthy();
  }));
});
