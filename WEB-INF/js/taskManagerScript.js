var taskManagementApp = angular.module('taskManagementApp',[]);

taskManagementApp.directive('listEnter',function(){
	return function(scope,element,attrs){
		element.bind("keyup",function(event){
			if(event.which === 13){
				var name = this.name;
				var enteredVal = this.value;
				scope.$apply(function(){
					if(enteredVal.trim().length == 0){
						alert("Please Enter a Name");
					}else{
						var scope = angular.element(document.getElementById('taskManagementHtmlBody')).scope();
						if(scope.lists.length != 0){
							for(var i=0;i<scope.lists.length;i++){
								if(scope.lists[i].index == name){
									var prevName = scope.lists[i].name;
									if(prevName.trim().length != 0){
										var index = scope.listNamesObj.indexOf(prevName);
										scope.listNamesObj.splice(index,1);
									}
									scope.lists[i].name = enteredVal;
									scope.lists[i].listNameVal = true;
									scope.listNamesObj.push(enteredVal);
									scope.changeListHtml();
								}
							}
						}
					}
				});
			}
		});
	}
});

taskManagementApp.directive('cardStatus',function(){
	return function(scope,element,attrs){
		element.bind("keyup",function(event){
			if(event.which === 13){
				var cardIndex = this.name;
				var listIndex = this.id;
				var enteredVal = this.value;
				scope.$apply(function(){
					if(enteredVal.trim().length == 0){
						alert("Please enter a status");
					}else{
						var scope = angular.element(document.getElementById('taskManagementHtmlBody')).scope();
						if(scope.lists.length != 0){
							for(var i=0;i<scope.lists.length;i++){
								if(scope.lists[i].index == listIndex){
									var cards = scope.lists[i].cards;
									for(var j=0;j<scope.lists[i].cards.length;j++){
										if(scope.lists[i].cards[j].index == cardIndex){
											scope.lists[i].cards[j].status = enteredVal;
											scope.lists[i].cards[j].cardStatusVal = true;
										}
									}
								}
							}
						}
					}
				})
			}
		})
	}
});

taskManagementApp.directive('cardUser',function(){
	return function(scope,element,attrs){
		element.bind("keyup",function(event){
			if(event.which === 13){
				var cardIndex = this.name;
				var listIndex = this.id;
				var enteredVal = this.value;
				scope.$apply(function(){
					if(enteredVal.trim().length == 0){
						alert("Please enter a UserName");
					}else{
						var scope = angular.element(document.getElementById('taskManagementHtmlBody')).scope();
						if(scope.lists.length != 0){
							for(var i=0;i<scope.lists.length;i++){
								if(scope.lists[i].index == listIndex){
									var cards = scope.lists[i].cards;
									for(var j=0;j<scope.lists[i].cards.length;j++){
										if(scope.lists[i].cards[j].index == cardIndex){
											scope.lists[i].cards[j].userName = enteredVal;
											scope.lists[i].cards[j].cardUserVal = true;
										}
									}
								}
							}
						}
					}
				})
			}
		})
	}
});

taskManagementApp.directive('cardName',function(){
	return function(scope,element,attrs){
		element.bind("keyup",function(event){
			if(event.which === 13){
				var cardIndex = this.name;
				var listIndex = this.id;
				var enteredVal = this.value;
				scope.$apply(function(){
					if(enteredVal.trim().length == 0){
						alert("Please enter a UserName");
					}else{
						var scope = angular.element(document.getElementById('taskManagementHtmlBody')).scope();
						if(scope.lists.length != 0){
							for(var i=0;i<scope.lists.length;i++){
								if(scope.lists[i].index == listIndex){
									var cards = scope.lists[i].cards;
									for(var j=0;j<scope.lists[i].cards.length;j++){
										if(scope.lists[i].cards[j].index == cardIndex){
											scope.lists[i].cards[j].name = enteredVal;
											scope.lists[i].cards[j].cardNameVal = true;
										}
									}
								}
							}
						}
					}
				})
			}
		})
	}
});

taskManagementApp.directive('repeatDirective',function(){
	return function(scope,element,attrs){
		if(scope.$last){
			scope.changeListHtml();
		}
	}
});
taskManagementApp.controller('mainController',function($scope){
	console.log('inside mainController');
	$scope.lists = listObjects;
	$scope.listNamesObj = listNames;
	
	$scope.createNewList = function(){
		var obj = {"index":$scope.lists.length,"listNameVal":false,"name":"","cards":[]};
		$scope.lists[$scope.lists.length] = obj;
		$scope.changeListHtml();
	}
	
	$scope.createNewCard = function (listName) {
		if($scope.lists.length != 0){
			for(var count=0;count<$scope.lists.length;count++){
				if($scope.lists[count].name == listName){
					var cardObj = $scope.lists[count].cards;
					var obj = {"index" : cardObj.length,"cardStatusVal":false,"status":"",
							"cardUserVal" : false,"userName" : "" , "cardNameVal":false,"name":""}
					$scope.lists[count].cards[cardObj.length] = obj;
					$scope.changeListHtml();
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
					var listNamesIndex = $scope.listNamesObj.indexOf(list.name);
					$scope.listNamesObj.splice(listNamesIndex,1);
					$scope.changeListHtml()
				}else{
					continue;
				}
			}
		}
	}
	
	$scope.deleteCard = function(cardIndex,listName){
		if($scope.lists.length != 0){
			for(var count=0;count<$scope.lists.length;count++){
				if($scope.lists[count].name == listName){
					var cards = $scope.lists[count].cards;
					for(var j=0;j<cards.length;j++){
						if(cards[j].index == cardIndex){
							var card = $scope.lists[count].cards[j];
							var index = $scope.lists[count].cards.indexOf(card);
							$scope.lists[count].cards.splice(index,1);
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
						}
					}
				}
			}
		}
		
		//Add Card to the new List
		var parent = $(obj.target).closest('td');
		var newListName = parent.find('#moveListName option:selected').val();
		if($scope.lists.length != 0){
			for(var count=0; count<$scope.lists.length;count++){
				if($scope.lists[count].name == newListName){
					var cardObj = $scope.lists[count].cards;
					$scope.lists[count].cards[cardObj.length] = card;
				}
			}
		}
	}
	
	$scope.changeListName = function(listName){
		var nameVal = listName;
		if($scope.lists.length != 0){
			for(var x=0;x<$scope.lists.length;x++){
				if($scope.lists[x].name == nameVal){
					$scope.lists[x].listNameVal = false;
				}
			}
		}
	}
	
	$scope.changeCardStatus = function(listName,cardIndex){
		if($scope.lists.length != 0){
			for(var x=0;x<$scope.lists.length;x++){
				if($scope.lists[x].name == listName){
					var cardsObj = $scope.lists[x].cards;
					for(var i=0;i<cardsObj.length;i++){
						if($scope.lists[x].cards[i].index == cardIndex){
							$scope.lists[x].cards[i].cardStatusVal = false;
						}
					}
				}
			}
		}
	}
	
	$scope.changeCardUser = function(listName,cardIndex){
		if($scope.lists.length != 0){
			for(var x=0;x<$scope.lists.length;x++){
				if($scope.lists[x].name == listName){
					var cardsObj = $scope.lists[x].cards;
					for(var i=0;i<cardsObj.length;i++){
						if($scope.lists[x].cards[i].index == cardIndex){
							$scope.lists[x].cards[i].cardUserVal = false;
						}
					}
				}
			}
		}
	}
	
	$scope.changeCardName = function(listName,cardIndex){
		if($scope.lists.length != 0){
			for(var x=0;x<$scope.lists.length;x++){
				if($scope.lists[x].name == listName){
					var cardsObj = $scope.lists[x].cards;
					for(var i=0;i<cardsObj.length;i++){
						if($scope.lists[x].cards[i].index == cardIndex){
							$scope.lists[x].cards[i].cardNameVal = false;
						}
					}
				}
			}
		}
	}
	
	$scope.changeListHtml = function(){
		var optionsHtml = '<option value=""> - Select -</option>';
		if($scope.listNamesObj){
			for(var i in $scope.listNamesObj){
				optionsHtml = optionsHtml + '<option value='+$scope.listNamesObj[i]+'>'+$scope.listNamesObj[i]+'</option>';
			}
		}
		var options = document.getElementsByTagName('select');
		for(var i=0;i<options.length;i++){
			options[i].innerHTML = optionsHtml;
		}
	}
	
});

window.onbeforeunload = function(){
	var e = e||window.event;
	if(e){
		saveValues();
	}
}

function saveValues(){
	localStorage.setItem('listObjects',JSON.stringify(listObjects));
	localStorage.setItem('listNames', JSON.stringify(listNames));
}
