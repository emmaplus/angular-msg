var myControllers = angular.module('myControllers', []);
myControllers.controller("ListCtrl", function($scope, $firebase) {
	var ref = new Firebase("https://angular-msg.firebaseio.com/");
	$scope.messages = $firebase(ref);
	var keys = $scope.messages.$getIndex();
	keys.forEach(function(key, i) {
		console.log(i, $scope.items[key]); // Prints items in order they appear in Firebase.
	});

	$scope.addMsg = function() {
		$scope.messages.$add({
			name : $scope.name,
			text : $scope.text
		}).then(function(ref) {
					console.log(ref.name());
				});
		//$scope.name = "";
		$scope.text = "";
	};

	$scope.removeMsg = function(target) {
		var id = angular.element(target).attr('data-id');
		$scope.messages.$remove(id);
	};

	$('#text').on('keypress', function(event) {
		if (event.keyCode == 13) {
			$scope.addMsg();
		}
	})
});