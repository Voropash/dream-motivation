import {TimeService} from "../services/timeService";
import {Observable} from "../../../../../node_modules/rxjs/Observable.d";
import {myService} from "../services/service";
import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Http} from '@angular/http';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {AuthHttp} from 'angular2-jwt';
import {contentHeaders} from '../common/headers';


let styles = require('./home.css');
let template = require('./home.html');

@Component({
    selector: 'home',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    template: template,
    styles: [styles]
})
export class Home implements OnInit {

    month = 2592000000; // in millis

    currentState;
    currentPercent;
    currentDays;

    data;
    date;

    constructor(public router: Router, private service: myService, private timeService: TimeService) {
        this.getDate();
    }

    ngOnInit() {
        this.service.getData().then(response => {
            this.data = response;
        });
    }

    updateCurrentState() {
        if (this.data) {
            let currentState = (this.data.state + (this.date.getTime() - this.data.timestamp) / this.month * this.data.add[0]);
            this.currentState = Math.round(currentState * 10000) / 10000;

            let currentPercent = 100 * this.currentState / this.data.target;
            this.currentPercent = Math.round(currentPercent * 1000000) / 1000000;

            let currentDays = (this.data.target - this.currentState) / this.data.add[0] * 30;
            this.currentDays = Math.round(currentDays * 1) / 1;
        }
    }

    getDate() {
        this.timeService.time.subscribe(t => {
            this.date = t;
            this.updateCurrentState();
        });
    }
}
