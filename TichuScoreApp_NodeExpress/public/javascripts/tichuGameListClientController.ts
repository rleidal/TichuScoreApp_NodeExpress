module tichuClient {
    interface sumHolder {
        sum: number;
    }
    interface addTestView extends ng.IScope {
        sum_c: sumHolder;
        addA: number;
        addB: number;

        events: tichuGameListClientController;
    }

    export class tichuGameListClientController {
        static $inject = ['$scope', 'tichuClientService'];

        view: addTestView;
        service: tichuClientService;

        constructor($scope: addTestView, service: tichuClientService) {
            this.view = $scope;
            this.view.events = this;
            this.service = service;
            this.view.sum_c = service;

//            $scope.$on('UpdateSum', this.update_view.bind(this));
        }

        update_view() {
            this.view.$digest();
        }

        add_them() {
            this.service.socket.emit('addThem', { A: this.view.addA, B: this.view.addB });
            this.service.socket.emit('enterGame', { gameID: 5 });
        }
    }
}