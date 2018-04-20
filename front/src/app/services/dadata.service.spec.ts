import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { DadataService } from './dadata.service';

import {  HttpRequest, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const API_TOKEN = '8b7731722b31e8c5dcb0f72dfd457e9e7041512f';
describe('DadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [DadataService]
    });
  });

  it('should be created', inject([DadataService], (service: DadataService) => {
    expect(service).toBeTruthy();
  }));

  it('suggestAddress должен стучаться по правильному урлу', inject(
    [DadataService, HttpTestingController],
    fakeAsync((service: DadataService, backend: HttpTestingController) => {
      service.suggestAddress('foo');
      const request = backend.expectOne((req: HttpRequest<any>) => true);
      request.flush({
        suggestions: []
      });
      tick();
      expect(request.request.url).toBe(API_URL);
    })
  ));

  it('suggestAddress должен отдавать правильные заголовки', inject(
    [DadataService, HttpTestingController],
    fakeAsync((service: DadataService, backend: HttpTestingController) => {
      service.suggestAddress('foo');
      const request = backend.expectOne((req: HttpRequest<any>) => true);
      request.flush({
        suggestions: []
      });
      tick();
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.headers.get('Accept')).toBe('application/json');
      expect(request.request.headers.get('Authorization')).toBe('Token ' + API_TOKEN);
    })
  ));

  it('suggestAddress должен отдавать правильные данные в теле запроса', inject(
    [DadataService, HttpTestingController],
    fakeAsync((service: DadataService, backend: HttpTestingController) => {
      service.suggestAddress('foo');
      let request = backend.expectOne((req: HttpRequest<any>) => true);
      request.flush({
        suggestions: []
      });
      tick();
      expect(request.request.body.query).toBe('foo');
      expect(request.request.body.count).toBe(5);
      service.suggestAddress('foo', 42);
      request = backend.expectOne((req: HttpRequest<any>) => true);
      request.flush({
        suggestions: []
      });
      tick();
      expect(request.request.body.count).toBe(42);
    })
  ));
});
