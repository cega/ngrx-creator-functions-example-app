import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FindBookPageActions } from '../actions';
import { Book } from '../models';
import * as fromBooks from '../reducers';

@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search
      [query]="searchQuery$ | async"
      [searching]="loading$ | async"
      [error]="error$ | async"
      (search)="search($event)"
    >
    </bc-book-search>
    <bc-book-preview-list [books]="books$ | async"> </bc-book-preview-list>
  `,
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromBooks.State>) {
    this.searchQuery$ = store.select(fromBooks.selectSearchQuery).pipe(take(1));
    this.books$ = store.select(fromBooks.selectSearchResults);
    this.loading$ = store.select(fromBooks.selectSearchLoading);
    this.error$ = store.select(fromBooks.selectSearchError);
  }

  search(query: string) {
    console.log('query: ', query);
    this.store.dispatch(FindBookPageActions.searchBooks({ query }));
  }
}
