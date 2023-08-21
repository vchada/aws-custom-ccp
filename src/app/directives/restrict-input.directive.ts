import {
    Directive,
    HostListener
  } from "@angular/core";
  
  @Directive({ selector: "[appAllowInput]" })
  export class AllowInputDirective {
    regexpStr = "";
    constructor() { }
  
    @HostListener("keypress", ["$event"]) onKeypress(e: KeyboardEvent) {
      this.regexpStr += "[0-9]*";
  
  
      if (this.regexpStr !== "" &&
        !new RegExp("^" + this.regexpStr + "$").test(e.key)) {
        e.preventDefault();
      }
  
    }
  
    @HostListener("keyup", ["$event"]) onKeyup(e: KeyboardEvent) {
      let target = e.target as HTMLInputElement;
      target.value = target.value.toUpperCase();
    }
  
  }
  