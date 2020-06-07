import uuid from "uuid";
import words from "./words";
//import randomWords from "random-words";

const generateRoomId = () => {
	const roomId = getRandomInt(100, 1000) + "-" + getRandomInt(100, 1000)
	return roomId;
}
const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
}
const newRoom = () => {
	const room ={
		id: generateRoomId(),
		users:[],
		gameCount:0,
		redWinCount:0,
		blueWinCount:0,
		game:{
		}
	}
	return room;
}
const newGame = () => {
	const firstTurn =  decideFirstTurn();
	let blueCount = 8;
	let redCount = 8;
	firstTurn === "blue" ? blueCount++ : redCount++;

	const clues = [];
	createClues("blue",blueCount, false, clues);
	createClues("red",redCount ,false, clues);
	createClues(null, 1, true, clues);	
	createClues(null, 7, false, clues);
	shuffle(clues);

	const game = {
		turn : firstTurn,
		clues: clues,
		blueCount: blueCount,
		redCount: redCount,
		gameActive: true
	}
	return game;
};
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}
const decideFirstTurn = () => {
	return Math.random() <0.5 ? "blue" : "red";
}
const createClues = (team, count, assassin, clues) => {
	for(let i = 0; i < count; i++){
		const clue = {
			id: uuid.v4(),
			title: words.shift(),
		}
		if (assassin) {
			clue.assassin = true;
		} else if (team) {
			clue.team = team;
		}
		clues.push(clue);
	}
	return clues;
}
const createUserId = () => {
	return 	uuid.v4()
}

export  {newGame, createClues, newRoom, createUserId};