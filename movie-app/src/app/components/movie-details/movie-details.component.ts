import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MovieListObject } from '../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AsyncPipe, Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
movie$ : Observable<MovieListObject>;

constructor(private route: ActivatedRoute,
  private movieService: MovieService,
  private router: Router){
    const id = this.route.snapshot.paramMap.get('id');
    this.movie$ = this.movieService.getMovie(id!);
  }

  close(): void {
    this.router.navigate(['/movies']);
}
}
