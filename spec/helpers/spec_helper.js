beforeEach(function(){
	jasmine.addMatchers({
		toEqualData: function(util, customerEqualityTester){
			return{
				compare: function(actual, expected){
					var result = {}
					result.pass = angular.equals(actual, expected)
					return result
				}
			}
		}
	})
})