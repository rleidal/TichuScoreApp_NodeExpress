module tichuClient {
    'use strict';

    export class tichuClientService {
        cnt = 0;
        getMessage(): string {
            this.cnt++;
            return "Test Message has been reloaded " + this.cnt + " times";
        }
    }
}