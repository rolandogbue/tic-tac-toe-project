import { useState } from "react";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBorad({ onSelectedSquare, activePlayerSymbol }) {
	const [gameBoard, setGameBoard] = useState(initialGameBoard);

	function handleGameBoardClick(rowIndex, colIndex) {
		setGameBoard((prevGameBoard) => {
			const updatedGameBoard = [
				...prevGameBoard.map((innerGameBoard) => [...innerGameBoard]),
			];
			updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
			return updatedGameBoard;
		});

		onSelectedSquare();
	}

	return (
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button
									onClick={() => handleGameBoardClick(rowIndex, colIndex)}
								>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
