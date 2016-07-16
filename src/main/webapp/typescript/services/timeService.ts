import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/share';

@Injectable()
export class TimeService {

  public time;

  constructor() {
    this.time = Observable.interval(10).map(x => new Date()).share();
  }
}
