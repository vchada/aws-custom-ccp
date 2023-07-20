import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {

    contactAttributeChange = new Subject();

    constructor() {}

  
}
