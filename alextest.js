var app = angular.module('alextest', ['ngTouch', 'ngAnimate', 'ui.bootstrap', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.autoResize']);

app.controller('AlexTestCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {

    // Define the options for the grid used to display the json data
    $scope.gridOptions = {
        enableGridMenu: true,
        enableSelectAll: true,
        enableSorting: true,
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        multiSelect: false,
        enableHorizontalScrollbar: 0,
        enableVerticalScrollbar: 1,
        columnDefs: [
          { name: 'Name', field: 'name', width: 140 },
          { name: 'Address', field: 'address', width: 400 },
        ],
        data: [],
        rowHeight: 24,
    };

    // Defines a function to Load the data from your json file - this will only work from 
    // a web server
    this.getPerfData = function getPerfData() {
        return $http.get('alextestdata.json').success(function (response) {
           var dd = eval(response);
            dd = dd.CommercialCompanies;
            $scope.gridOptions.data.length = 0;
            angular.forEach(dd, function (row) {
                $scope.gridOptions.data.push(row);
            });
        });
    };

    // Call the function that gets the data
    this.getPerfData();
}]);