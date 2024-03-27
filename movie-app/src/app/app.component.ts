import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieListComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private searchService: SearchService, private router: Router) {
    this.searchForm =  this.formBuilder.group({
      search: ['']
    });
    this.searchForm.get('search')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchService.setSearchTerm(term);
    });
  }

  onSubmit() {
    this.searchService.setSearchTerm(this.searchForm.value.search);
  }

  logout(){
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
    }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  }
