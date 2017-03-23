var taskManagementApp = angular.module('taskManagementApp',[]);

taskManagementApp.controller('mainController',function($scope){
	console.log('inside mainController');
	$scope.lists = listObjects;
	$scope.listNames = listName;
	
	$scope.createNewList = function(){
		var obj = {"index":lists.length,"listNameVal":false,"name":"","cards":[]};
		$scope.lists[lists.length] = obj;
		listObjects[lists.length] = obj;
	}
	
	$scope.createNewCard = function (listName) {
		if($scope.lists.length != 0){
			for(var count=0;count<$scope.lists.length;count++){
				if($scope.lists[count].name == listName){
					var cardObj = $scope.lists[count].cards;
					var obj = {"index" : cardObj.length,"cardStatusVal":false,"status":"",
							"cardUserVal" : false,"userName" : "" , "cardNameVal":false,"name":""}
					$scope.lists[count].cards[cardObj.length] = obj;
					listObjects[count].cards[cardObj.length] = obj;
				}else{
					continue;
				}
			}
		}
	}
	
	$scope.deleteList = function (listIndex){
		if($scope.lists.length != 0){
			for(var count = 0; count <$scope.lists.length;count++){
				if($scope.lists[count].index == listIndex){
					var list = $scope.lists[count];
					var index = $scope.lists.indexOf(list);
					$scope.lists.splice(index,1);
					listObjects.splice(index,1);
				}else{
					continue;
				}
			}
		}
	}
	
	$scope.deleteCard = function(cardName,listName){
		if($scope.lists.length != 0){
			for(var count=0;count<$scope.lists.length;count++){
				if($scope.lists[count].name == listName){
					var cards = $scope.lists[count].cards;
					for(var j=0;j<cards.length;j++){
						if(cards[j].name == cardName){
							var card = $scope.lists[count].cards[j];
							var index = $scope.lists[count].cards.indexOf(card);
							$scope.lists[count].cards.splice(index,1);
							listObjects[count].cards.splice(index,1);
						}
					}
				}else{
					cotinue;
				}
			}
		}
	}
	
	$scope.moveCard = function(listName,cardName,obj){
		var card;
		//deletCard from current list
		if($scope.lists.length != 0){
			for(var count=0;count<$scope.lists.length;count++){
				if($scope.lists[count].name == listName){
					var cards = $scope.lists[count].cards;
					for(var j=0;j<cards.length;j++){
						if(cards[j].name == cardName){
							card = $scope.lists[count].cards[j];
							var index = $scope.lists[count].cards.indexOf(card);
							$scope.lists[count].cards.splice(index,1);
							listObjects[count].cards.splice(index,1);
						}
					}
				}
			}
		}
		
		//Add Card to the new List
		var parent = $(obj).closest('td');
		var newListName = parent.find('#moveListName option:selected').val();
		if($scope.lists.length != 0){
			for(var count=0; count<$scope.lists.length;count++){
				if($scope.lists[count].name == newListName){
					var cardObj = $scope.lists[count].cards;
					$scope.lists[count].cards[cardObj.length] = card;
					listObjects[count].cards[cardObj.length] = card;
				}
			}
		}
	}
});

$('#listNameValue').on('keyup',function(e){
	if(e.which == 13){
		var listIndex = this.name;
		if(this.value.trim.length == 0){
			alert("Please enter a Name");
		}else{
			var scope = angular.element(document.getElementById('taskmanagementHtmlBody')).scope();
			if(scope.lists.length != 0){
				for(var i=0;i<scope.lists.length;i++){
					if(scope.lists[i].index == listIndex){
						scope.lists[i].name == this.value;
						scope.lists[i].listNameVal = true;
						scope.listNames.push(this.value);
					}
				}
			}
		}
	}
});

$('#listName').on('click',function(e){
	var nameVal = this.html();
	var scope = angular.element(document.getElementById('taskmanagementHtmlBody')).scope();
	if(scope.lists.length != 0){
		for(var x=0;x<scope.lists.length;x++){
			if(scope.lists[i].name == nameVal){
				scope.lists[i].listNameVal = false;
			}
		}
	}
});
