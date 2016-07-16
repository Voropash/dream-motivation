import {Injectable} from '@angular/core';


@Injectable()
export class DatesConverter {
    constructor() {
    }

    public millisToDate(millis): Date {
        let date: Date = new Date(millis);
        return date;
    }

    public millisToString(millis): string {
        let date: Date = this.millisToDate(millis);
        var dateFormat = require('dateformat');
        return dateFormat(date, 'dd.mm.yyyy hh:MM');
    }
}
