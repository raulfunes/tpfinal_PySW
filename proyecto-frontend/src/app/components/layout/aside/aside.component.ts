import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnDestroy {
  open = true;
  mode = new FormControl('side');
  destroyed = new Subject<void>();
  currentScreenSize: string;
  usu_nombre:string = "RAUL";

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            this.small_device();
          }
        }
    });
  }

  small_device(){
    if(this.currentScreenSize == "Small" || this.currentScreenSize == "XSmall"){
      this.open = false;
    }else{
      this.open = true;
    }
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
