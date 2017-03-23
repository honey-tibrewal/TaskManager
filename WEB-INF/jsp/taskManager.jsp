<!DOCTYPE html>
<%@page contentType="text/html" language="java"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE-edge">
		<title>Task Manager</title>
		<script src="../js/jquery-1.11.1.js"></script>
		<script src="../js/angular.min.js"></script>
		<script src="../js/taskManagerScript.js"></script>
		<script type="text/javascript">
		var listObjects= [];
		var listNames = [];
		</script>
	</head>
	<body ng-app="taskManagementApp" ng-controller="mainController"
	id="taskManagementHtmlBody">
	<div>
		<button type="button" id="createList" ng-click="createNewList()">+</button>
	</div>
	<table id="listBody" data-ng-repeat="list in lists" style="border-style:solid;border:thin">
		<thead>
			<tr>
				<th id="listName" ng-if="list.listNameVal">
					{{list.name}}
				</th>
				<th ng-if="!list.listNameVal">
					<input type="text" id="listNameValue" placeholder="Enter List Name" 
					name="{{list.index}}" value = "{{list.name}}" />
				</th>
				<th>
					<button type="button" ng-click="deleteList(list.index)">Delete List</button>
				</th>
			</tr>
		</thead>
		<tbody data-ng-repeat ="card in list.cards">
			<tr style="border-style:solid;border:thin;">
				<td ng-if="card.cardStatusVal">
					{{card.status}}
				</td>
				<td ng-if="!card.statusVal">
					<input type="text" id="cardStatusValue" placeholder="Enter card status"
					value="{{card.status}}" name="{{card.index}}">
				</td>
				<td ng-if="card.cardUserVal">
					{{card.userName}}
				</td>
				<td ng-if=!card.cardUserVal>
					<input type="text" id="cardUserValue" placeholder="Enter Card User"
					value="{{card.userName}}" name="{{card.index}}">
				</td>
				<td ng-if = "card.cardNameVal">
					{{card.name}}
				</td>
				<td ng-if="!card.cardNameVal">
					<input type="text" id="cardNameValue" placeholder="Enter Card Name"
					value="{{card.name}}" name="{{card.index}}">
				</td>
			</tr>
			<tr>
				<td>
					<button type="button" ng-click="deleteCard(card.name,list.name)">Delete Card
					</button>
				</td>
				<td>
					<label>Transfer card:</label>
					<select id="moveListName" ng-options="name in listNames"></select>
					<button type="button" ng-click="movecard(list.name,card.name,this);">
					Move Card</button>
				</td>
			</tr>
		</tbody>
		<tfoot ng-if = "list.listNameVal">
			<tr>
				<td>
					<div>
						<button type="button" id="createCard" ng-click="createNewCard(list.name)">
						Add New Card</button>
					</div>
				</td>
			</tr>
		</tfoot>
	</table>
	
	</body>
</html>