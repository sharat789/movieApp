import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Observable, of } from 'rxjs';
import { MovieListObject } from '../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.component.html',
  standalone: true,
  styleUrls: ['./movie-list.component.scss', '../../app.component.scss']
})
export class MovieListComponent  {
  movies$: Observable<MovieListObject[]> = of([]);

  constructor(private movieService : MovieService) {
    this.movies$ = this.movieService.getMovies();
  }
}
