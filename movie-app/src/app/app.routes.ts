import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {path: 'movies', component: MovieListComponent},
  {path: 'movies/movie/:id', component: MovieDetailsComponent},
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];
