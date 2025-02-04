import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
	const [activePlayer, setActivePlayer] = useState("X");

	function handleSelectedSquare() {
		setActivePlayer(activePlayer === "X" ? "0" : "X");
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
						symbol="0"
						isActive={activePlayer === "0"}
					/>
				</ol>
				<GameBoard
					onSelectedSquare={handleSelectedSquare}
					activePlayerSymbol={activePlayer}
				/>
			</div>
			LOG
		</main>
	);
}

export default App;
