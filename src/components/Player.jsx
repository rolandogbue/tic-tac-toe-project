import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(initialName);

	const handleEditClick = () => {
		setIsEditing((status) => !isEditing);
	};

	const handleChangeName = (event) => {
		setName(event.target.value);
	};

	let playerName = <span className="player-symbol">{name}</span>;

	if (isEditing) {
		playerName = (
			<input type="text" value={name} onChange={handleChangeName} required />
		);
	}

	return (
		<li className={isActive ? "active" : undefined}>
			<span className="player">
				{playerName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}
