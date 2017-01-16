var app = angular.module('alextest', ['ngTouch', 'ngAnimate', 'ui.bootstrap', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.autoResize', 'chart.js']);

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
        return $http({
            method: "GET",
            url: "http://localhost:3000/alextestdata.json"
        }).then(function mySucces(response) {
            var dd = eval(response.data);
            dd = dd.CommercialCompanies;
            $scope.gridOptions.data.length = 0;
            angular.forEach(dd, function (row) {
                $scope.gridOptions.data.push(row);
            });
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });


        /*
        
                return $http.get('alextestdata.json').success(function (response) {
                    var dd = eval(response);
                    dd = dd.CommercialCompanies;
                    $scope.gridOptions.data.length = 0;
                    angular.forEach(dd, function (row) {
                        $scope.gridOptions.data.push(row);
                    });
                });
                */
    };



    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];


    // Call the function that gets the data
    this.getPerfData();


}]);