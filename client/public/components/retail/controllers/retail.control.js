retail
    .controller('RetailController', function($scope, Chain, Store, Employee, Map) {
        Chain.query_get().$promise.then(function(data) {
            $scope.chains = data;
        });
        Store.query().$promise.then(function(data) {
            $scope.stores = data;
        });
        Employee.query().$promise.then(function(data) {
            $scope.employees = data;
        });
        Map.query().$promise.then(function(data){
            $scope.maps = data;
        });
        
        // Map.query().$promise.then(function(response){
        //     response.forEach(function(data){
        //         $scope.maps.push({
        //             latitud: data.latitud,
        //             longitud: data.longitud,
        //             });
        //         })
        //     });
        //     console.log($scope.maps)
    });