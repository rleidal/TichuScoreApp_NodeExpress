module tichuClient {
    'use strict';

    class gameDetails {
    }


    export class tichuClientService {
        //$rootScope: ng.IRootScopeService;
        $timeout: ng.ITimeoutService;
        socket: ClientSocket;
        scoreModel: tichuClientScoreModel;
        cnt: number;
        sum: number;
//        constructor($rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService) {
        constructor($timeout: ng.ITimeoutService) {
            this.sum = 0;
            this.cnt = 0;
            //this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.socket = io.connect();

            this.scoreModel = new tichuClient.tichuClientScoreModel(this.$timeout, this.socket);
            this.socket.on('result', this.setSum.bind(this) );
        }

        setSum(data: any) {
            this.$timeout(function () {
                this.sum = data.sum
            }.bind(this));
//            this.rootScope.$broadcast('UpdateSum', this.sum);
        }

        getMessage(): string {
            this.cnt++;
            return "Test Message has been reloaded " + this.cnt + " times";
        }
    }
}