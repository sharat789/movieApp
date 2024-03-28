import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { MovieListObject } from '../types';
import { hot } from 'jasmine-marbles';
describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve movies', (done) => {
    const dummyMovies: MovieListObject[] = [
      { id: 1, original_title: 'Movie 1' },
      { id: 2, original_title: 'Movie 2' },
    ];

    service.getMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
      done();
    });
    const req = httpMock.expectOne(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=bc3cbb180a0ca2a35eb2d9c278f6d3b3`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ results: dummyMovies });
  });

  it('should retrieve a movie by id', (done) => {
    const dummyMovie: MovieListObject = { id: 1, original_title: 'Movie 1' };

    service.getMovie('1').subscribe((movie) => {
      expect(movie).toEqual(dummyMovie);
      done();
    });

    const req = httpMock.expectOne(
      `https://api.themoviedb.org/3/movie/1?api_key=bc3cbb180a0ca2a35eb2d9c278f6d3b3`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovie);
  });

  it('should search movies', () => {
    const dummyMovies: MovieListObject[] = [
      { id: 1, original_title: 'Movie 1' },
      { id: 2, original_title: 'Movie 2' },
    ];

    service.searchMovies('Movie').subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne(
      `https://api.themoviedb.org/3/search/movie?api_key=bc3cbb180a0ca2a35eb2d9c278f6d3b3&query=Movie`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ results: dummyMovies });
  });
});
