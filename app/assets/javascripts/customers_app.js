const app = angular.module('customers', ['ngRoute','ngResource','templates'])

//configure the routes
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when("/", { 
		controller: 'CustomerSearchController', 
		templateUrl: "customer_search.html"
	}).when("/:id", {
		controller: 'CustomerDetailController',
		templateUrl: 'customer_detail.html'

	})

}])


app.controller('CustomerSearchController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	let page = 0 
	$scope.customers = []

	$scope.search = function(searchTerm){
		if(searchTerm.length < 3) {
			return $scope.customers = []
		}

		$scope.searchedFfor = searchTerm 

		$http.get("/customers.json", {
			"params": {"keywords": searchTerm , "page": page}
		}).then(function(response){
			$scope.customers = response.data 
		}, function(response){
			alert("There was a problem: " + response.status)
		}

		)
	}

	$scope.viewDetails = function(customer){
		$location.path("/" + customer.id)
	}

	$scope.previousPage = function(){
		if(page > 0){
			page = page - 1
			$scope.search($scope.keywords)
		}
	}

	$scope.nextPage = function(){
		page = page + 1
		$scope.search($scope.keywords)		
	}
	
}])

app.controller('CustomerDetailController', ['$scope', '$http', '$resource','$routeParams',function ($scope, $http,$resource, $routeParams) {

 	$scope.customerId = $routeParams.id 
 	$scope.customer = {}
 	//using $http, low level compared to $resource
 	 // $http.get("/customers/"+customerId+".json").then(function(response){
 	// 	$scope.customer = response.data
    //   }, function(response){
   //   	alert('There was a problem: ' + response.status)
   //   })

   const Customer = $resource('/customers/:customerId.json')

   $scope.customer = Customer.get({"customerId": $scope.customerId})
   // alert("Ajax Call Initiated")
}])

app.controller('CustomerCreditCardController', ['$scope', '$resource', function ($scope, $resource) {
	const CreditCardInfo = $resource('/fake_billing.json')

	// $scope.creditCard = CreditCardInfo.get({"cardholder_id": 1234})
	$scope.setCardholderId = function(cardholderId){
		$scope.creditCard = CreditCardInfo.get({"cardholder_id": cardholderId})
	}
	
}])


