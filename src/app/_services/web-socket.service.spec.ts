import { TestBed } from '@angular/core/testing';

import { WebSocketService } from './web-socket.service';

describe('ChatServiceService', () => {
  let service: WebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
