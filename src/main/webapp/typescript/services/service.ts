import {baseBackendContext} from "../common/baseBackendContext";
import {Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders} from '../common/headers';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class myService {

    private dataUrl: string = baseBackendContext + 'data';

    constructor(public h: Http) {
    }

    public getData(): any {
        return this.getAndExtractData('/db.json');
    }

    // public getData(): any {
    //     return {add:[38000], state:184211.91, target: 550000, timestamp:1468417895817 };
    // }

    protected extractData(res: Response): any {
        let body = res.json();
        return body || {};
    }

    protected handleError(error: any): Promise<void> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    protected log(body: any, methodName?: string): void {
        console.log(methodName + '() | Request: ' + body);
    }

    protected post(url: string, body: any): Promise<any> {
        return this.h.post(url, body, { headers: contentHeaders })
            .toPromise()
            .catch(this.handleError)
    }

    protected getR(url: string): Promise<any> {
        return this.h.get(url, { headers: contentHeaders })
            .toPromise()
            .catch(this.handleError)
    }

    protected postAndExtractData(url: string, body: any): any {
        return this.post(url, body).then(this.extractData);
    }

    protected getAndExtractData(url: string): any {
        return this.getR(url).then(this.extractData);
    }
}
