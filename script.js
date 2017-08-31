$(document).ready(function() {
	var game;
	var configureGameForm = $("#configureGame");
	var winnerAnnouncment = $("#winnerAnnouncment");
	
	$("#start").click(function() {
		console.log(winnerAnnouncment);
		let size = $("#configureGame form input[name='size'").val();
		console.log(size);
		if(size >= 3 && size <= 10) {
			configureGameForm.fadeOut("fast");
			game = new GameBoardObject(size);
			game.generateBoard();
		} else {
			$("#valError").fadeIn("fast");
			setTimeout(function() {$("#valError").fadeOut("fast");}, 2000)
		}	
	});
	$("#restart").click(function() {
		winnerAnnouncment.fadeOut("fast");
		configureGameForm.fadeIn("fast");
	});

function GameBoardObject(size) {

var fieldStateEnum = {
	CIRCLE: 1,
	CROSS: 2,
	NONE: 3,
	properties: {
    1: {code: "O", src: "img/circle.png"},
    2: {code: "X", src: "img/cross.png"},
    3: {code: " "}
  }
};

var gameBoard = [];
var gameBoardForm = $("#board");
var currentTurn = 0;
var currentPlayer = fieldStateEnum.CIRCLE;
var winner;
var boardDimension = size;


this.generateBoard = function() {
	console.log("start");
	let boardLength = boardDimension;
	gameBoardForm.empty();
	let table = $("<table></table>").appendTo(gameBoardForm);
	for (let i = 0; i< boardLength; i++) {
		let tableRow = $("<tr></tr>").appendTo(table);
		let rowArr = [];
		for (let j = 0; j< boardLength; j++) {
			tableRow.append("<td id = '"+i.toString() + j.toString()+"'></td>").id;
			rowArr[j] = fieldStateEnum.NONE;
		};
		gameBoard[i] = rowArr;
	};
	$("td").click(gameProceed);
	gameBoardForm.fadeIn("fast");
}

function updateGameBoard(id) {
	let i = id.charAt(0);
	let j = id.charAt(1);
	gameBoard[i][j] = currentPlayer;
	console.log(gameBoard[i][j]);
}

function gameProceed() {
	let cell = $(this);
	currentTurn++;
	let myId = cell.get(0).id;
	console.log("clicked " + myId);
	cell.append("<img class = 'filledField' src = '" + fieldStateEnum.properties[currentPlayer].src + "'/>");
	updateGameBoard(myId);
	if(currentTurn >= (2 * boardDimension) - 1) checkWin(myId);
	changePlayer();
	cell.off();
	console.log("turn " + currentTurn);
}

function changePlayer() {
	currentPlayer = currentPlayer === fieldStateEnum.CIRCLE ? fieldStateEnum.CROSS : fieldStateEnum.CIRCLE;
}

function checkWin(lastClickedPositionId) {
	let row = lastClickedPositionId.charAt(0);
	let column = lastClickedPositionId.charAt(1);
	let winner = false;
	//row
	if(!winner){
		console.log("checking row");
		for(let i = 0; i < boardDimension; i++) {
		if(gameBoard[row][i] === currentPlayer) {
				winner = true;
			} else {
				winner = false;
				break;
			}
		}
		console.log("row loop over");
		console.log("winner after row loop" + winner);
	}
	console.log("row end");
	//column
	if(!winner){
		console.log("checking column");
		for(let i = 0; i < boardDimension; i++) {
			if(gameBoard[i][column] === currentPlayer) {
					winner = true;
				} else {
					winner = false;
					break;
				}
			}
	}
		//slash
	if(!winner){
		console.log("checking slash");
		let count = 0;
		for(let i = 0; i < boardDimension; i++) {
			if(gameBoard[i][i] === currentPlayer) {
					winner = true;
				} else {
					winner = false;
					break;
				}
		}
		
	}
	
	//backslash
	if(!winner){
		console.log("checking backslash");
		let j = boardDimension - 1;
		for(let i = 0; i < boardDimension; i++) {
			if(gameBoard[i][j] === currentPlayer) {
					j--;
					winner = true;
				} else {
					winner = false;
					break;
				}
		}
		
	}
	
	console.log("won?" + winner);
	if (winner) {
		announceWinner(currentPlayer);
	} else if (currentTurn === boardDimension * boardDimension) {
		announceWinner(fieldStateEnum.NONE);
	}
	
	}
	
	function announceWinner(winner) {
	$(gameBoardForm).fadeOut("fast");
	if(winner != fieldStateEnum.NONE) {
		$("#winner").html(fieldStateEnum.properties[winner].code + " WON!");
	} else {
		$("#winner").html("IT'S A DRAW!").fadeIn("fast");
	}
	winnerAnnouncment.fadeIn();
}
}	
});









