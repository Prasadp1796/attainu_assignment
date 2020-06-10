const app = angular.module('citiesApp', ['ngSanitize', 'ngMessages', 'datatables', 'datatables.buttons', 'ui.bootstrap', 'ui.bootstrap.modal']);
//Datatable Configuration
app.run(['DTDefaultOptions', function(DTDefaultOptions) {
    DTDefaultOptions.setOption('lengthMenu', [
        [10, 20, 25, 50, -1],
        [10, 20, 25, 50, 'All']
    ]);
}]);


//Controller For Index Page
app.controller('citiesAppController', ["$scope", "$http", 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal', function($scope, $http, DTOptionsBuilder, DTColumnBuilder, $uibModal){
    //Method To Initialize Controller
    $scope.initController = function(){
        $scope.getCities();
    }



    //Method To Get Severs List
    $scope.getCities = function(){
        $scope.showLoader("Getting Cities List, Please Wait");
        $http.get('/fetchCitiesList').then(function(res){
            $scope.loaderModalInstance.close();
            if(res.status == 200){
                $scope.cities = res.data;
            }else
                alertify.error("Failed To Cities");
        })
    }

   
    //Method To Show Loader
    $scope.showLoader = function (message) {
        $scope.loaderModalInstance = $uibModal.open({
            // animation: true,
            template: `<div class="bd-example-modal-lg" data-backdrop="static"  data-keyboard="false">
                <div class="modal-dialog  modal-lg">
                    <div class="modal-content bg-transparent">
                        <div class="row">
                            <div style="width: 500px; margin-left: 45%;">
                                <span class="fa  fa-spinner fa-pulse fa-3x text-primary"></span>
                            </div>
                            <div style="width: 500px; margin-left: 1%; margin-top: 2%;">
                                <h6 class="text-center">{{record}}</h6>
                            </div>
                        </div>
                    </div>

                </div>
            </div>`,
            size: 'sm',
            backdrop: false,
            keyboard: false,
            windowClass: 'show',
            controller: function($scope, record){
                function init(){
                    $scope.record = record;
                }
                init();
               
            },
            resolve: {
                record: function() {
                    return message;
                }
            }
        });
    };
}]);


