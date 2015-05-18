module tichuClient {
    'use strict';

    var tichuClientApp = angular.module('tichuClientApp', ['ngRoute'])
        .controller('tichuScoreClientController', tichuScoreClientController)
        .controller('tichuGameListClientController', tichuGameListClientController)
        .service('tichuClientService', tichuClientService );

    tichuClientApp.config(['$routeProvider', function ($routeProvider : angular.route.IRouteProvider) {
        $routeProvider.when('/game:game_id',
            {
                templateUrl: 'GameScorePage.html',
                controller: 'tichuScoreClientController'
            })
            .otherwise({
            templateUrl: 'GameSelectPage.html',
            controller: 'tichuGameListClientController'
        });
    }]);

}