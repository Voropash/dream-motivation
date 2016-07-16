import {TimeService} from "../services/timeService";
import {myService} from "../services/service";
import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

let template = require('./app.html');

@Component({
    selector: 'cloud-catalog',
    template: template,
    directives: [ROUTER_DIRECTIVES],
    providers: [myService, TimeService]
})
export class App {
    response: string;
    api: string;

    constructor(public router: Router) {
    }
}
