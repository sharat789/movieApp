import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { MovieListObject } from '../../types';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.component.html',
  standalone: true,
  styleUrls: ['./movie-list.component.scss', '../../app.component.scss']  
})
export class MovieListComponent  {
  movies$: Observable<MovieListObject[]> = of([]);
  private destroy$ = new Subject<void>();
  constructor(private movieService : MovieService, private searchService: SearchService) {
    this.searchService.searchObservable.pipe(takeUntil(this.destroy$)).subscribe(term => {
      if (term) {
        this.movies$ = this.movieService.searchMovies(term);
      } else {
        this.movies$ = this.movieService.getMovies();
      }
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
