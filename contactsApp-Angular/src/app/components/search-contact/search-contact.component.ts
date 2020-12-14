import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Service } from 'src/app/services/service.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { TableData } from 'src/app/models/tableData.interface';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.css']
})
export class SearchContactComponent {

  public searchByAddress$ = new Subject<string>();
  public searchByEmailOrPhone$ = new Subject<string>();
  public searchByName$ = new Subject<string>();

  @Output() contactSearchResult = new EventEmitter<any>();

  constructor( private service: Service ) { 

    this.searchByAddress$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap( term => this.service.searchByAddress( term ))
      )
      .subscribe( ( resp: TableData ) => {
        this.contactSearchResult.emit( resp )
      })

    this.searchByEmailOrPhone$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap( term => this.service.searchByEmailOrPhone( term ))
      )
      .subscribe( ( resp: TableData ) => {
        this.contactSearchResult.emit( resp )
      })

    this.searchByName$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap( term => this.service.searchByName( term ))
      )
      .subscribe( ( resp: TableData ) => {
        this.contactSearchResult.emit( resp )
      })

  }

}
