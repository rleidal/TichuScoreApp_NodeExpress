module tichuClient {
    'use strict';

    var tichuClientApp = angular.module('tichuClientApp', ['ngRoute'])
        .controller('tichuScoreClientController', tichuScoreClientController)
        .controller('tichuScoreClientController2', tichuScoreClientController2)
        .controller('tichuGameListClientController', tichuGameListClientController)
        .service('tichuClientService', tichuClientService );

    tichuClientApp.config(['$routeProvider', function ($routeProvider : angular.route.IRouteProvider) {
        $routeProvider.when('/game/:gameID',
            {
                templateUrl: 'GameScorePage.html',
                controller: 'tichuScoreClientController'
            })
            .when('/newgame/:gameID',
            {
                templateUrl: 'GameScorePage2.html',
                controller: 'tichuScoreClientController2'
            })
            .otherwise({
            templateUrl: 'GameSelectPage.html',
            controller: 'tichuGameListClientController'
        });
    }]);

}