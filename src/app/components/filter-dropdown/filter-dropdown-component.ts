import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnChanges, OnInit, Output, PipeTransform, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router  } from '@angular/router';
import { map } from 'rxjs/operators';
import { FilterDropdownConfig } from '../../model/dropdown/filter-dropdown-config';
import { getBaseUrl } from 'src/app/service/auth/base-url';
import { AuthService } from 'src/app/service/auth/auth-service';

@Component({
  selector: 'filter-dropdown',
  styleUrls: ['./filter-dropdown-component.css'],
  templateUrl: './filter-dropdown-component.html',
})
export class FilterDropdownComponent implements OnInit, OnChanges {

    model: any = {};
    showSpinner: boolean = false;
    showResult: boolean = false;
    showScanSpinner: boolean = false;
    searchtext: string = '';
    resultList: any[] = [];
    count: number = 0;
    range: number = 100;
    searchoffset: number = 1;
    url:string  = '';
    Id: number = 0;
    baseUrl: string = getBaseUrl();
    
    @Input() config: FilterDropdownConfig = new FilterDropdownConfig;
    @Output() callbackEvent$: EventEmitter<any> = new EventEmitter<any>();
    @Input() displayPipe!: PipeTransform; 
    @Input() hasError!: Boolean;

    constructor(protected httpClient: HttpClient,
    protected authService: AuthService,
    protected eRef: ElementRef,
    protected route: ActivatedRoute,
    protected router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchtext = this.config.searchtext;
    this.url = this.config.url;
  }

  ngOnInit() {
    this.searchtext = this.config.searchtext;
    this.url = this.config.url;
  }

  async wait() {
    this.searchoffset = 1;
    this.showScanSpinner = true;
    this.showSpinner = false;
    this.showResult = false;
    await this.delay(1000);
    if(this.searchtext == '' || this.searchtext == null) {
      this.reset();
    } else {
      this.search();
    }
   }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  reset() {
    this.showScanSpinner = false;
    this.showSpinner = false;
    this.showResult = false;
  }

  displayResult() {
    this.showScanSpinner = false;
    this.showSpinner = false;
    this.showResult = true;    
  }

  selectResult(o: any) {
    this.searchtext = o.Name;
    this.Id = o.Id;
    this.config.originalValue = o.Name;
    this.reset();
    this.callbackEvent$.emit(o);
  }

  async loadnNxtSearch() {
    this.searchoffset++;    
    this.searchCall();
  }

  async searchCall() {
    this.httpClient.post<any>(this.baseUrl + this.url,
           {
              n: this.searchoffset,
              s: this.range,
              value: this.searchtext
          }).pipe(map(res => res))
          .subscribe(response => {
            this.resultList = response?.Result?.Result;
            this.count = response.Result.Count
            this.displayResult();
          });
  }

 async search() {
    this.showScanSpinner = false;
    this.showSpinner = true;
    this.showResult = false;
    await this.delay(1000);
    this.searchCall();
   }

  getTransformValue(value: any) {
    if(value !== undefined) {
      return this.displayPipe && this.displayPipe.transform ? this.displayPipe.transform(value) : value;
    } else {
      return value;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.showScanSpinner = false;
      this.showSpinner = false;
      this.showResult = false;
      this.searchtext = this.config.originalValue;
      this.callbackEvent$.emit({ Name:this.searchtext, Id: this.Id});
    }
  }
}
