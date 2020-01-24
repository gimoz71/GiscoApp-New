import { Injectable } from "@angular/core";

@Injectable()
export class SessionService {

    public TOKEN_KEY = 'token';
    public HEADTITLE_KEY = 'headertitle';
    public HEADHASBACK_KEY = 'headerhasback';

    private sessionMap: Map<string, string>;

    constructor() {
        this.sessionMap = new Map<string, string>();
    }

    public set(key: string, value: string): void {
        this.sessionMap.set(key, value);
    }

    public get(key: string): string {
        return this.sessionMap.get(key);
    }
}