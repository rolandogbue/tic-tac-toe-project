import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./Winning-combinations";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

let gameBoard = initialGameBoard;

for (const turn of turns) {
	const { square, player } = turn;
	const { row, col } = square;

	gameBoard[row][col] = player;
}

function derivedActivePlayer(gameTurns) {
	let currentPlayer = "X";

	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}

	return currentPlayer;
}

function App() {
	const [gameturns, setGameTurns] = useState([]);
	const activePlayer = derivedActivePlayer(gameturns);

	function handleSelectedSquare(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const currentPlayer = derivedActivePlayer(prevTurns);

			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];

			return updatedTurns;
		});
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName="player 1"
						symbol="X"
						isActive={activePlayer === "X"}
					/>
					<Player
						initialName="player 2"
						symbol="O"
						isActive={activePlayer === "O"}
					/>
				</ol>
				<GameBoard onSelectedSquare={handleSelectedSquare} board={gameBoard} />
			</div>
			<Log turns={gameturns} />
		</main>
	);
}

export default App;
