import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./Winning-combinations";

const PLAYERS = {
	X: "Player 1",
	O: "Player 2",
};

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTurns) {
	let currentPlayer = "X";
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}
	return currentPlayer;
}

function deriveGameBoard(gameturns) {
	let gameBoard = [...INITIAL_GAME_BOARD].map((innerBoard) => [...innerBoard]);
	for (const turn of gameturns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}
	return gameBoard;
}

function deriveWinner(gameBoard, players) {
	let winner;
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondtSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];
		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondtSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
}

function App() {
	const [gameturns, setGameTurns] = useState([]);
	const [players, setPlayers] = useState(PLAYERS);

	const activePlayer = deriveActivePlayer(gameturns);
	const gameBoard = deriveGameBoard(gameturns);
	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameturns.length === 9 && !winner;

	function handleSelectedSquare(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);
			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];
			return updatedTurns;
		});
	}

	function handleRematch() {
		setGameTurns([]);
	}

	function handlePlayerNamechange(symbol, newName) {
		setPlayers((prevPlayer) => {
			return {
				...prevPlayer,
				[symbol]: newName,
			};
		});
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName={PLAYERS.X}
						symbol="X"
						isActive={activePlayer === "X"}
						onNameChange={handlePlayerNamechange}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol="O"
						isActive={activePlayer === "O"}
						onNameChange={handlePlayerNamechange}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver winner={winner} onRematch={handleRematch} />
				)}
				<GameBoard onSelectedSquare={handleSelectedSquare} board={gameBoard} />
			</div>
			<Log turns={gameturns} />
		</main>
	);
}

export default App;
