module tichuClient {
    export class tichuGameListClientController {
        static $inject = ['$scope', 'tichuClientService'];

        constructor($scope: any, service: tichuClientService) {
            $scope.msg = service.getMessage();
        }
    }
}