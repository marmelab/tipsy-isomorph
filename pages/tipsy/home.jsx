import React, { useState } from "react";
import PlayerInputName from "../../lib/home/PlayerNameInput.jsx";
import Welcome from "../../lib/home/Welcome.jsx";

const Home = () => {
    const [playerName, setPlayerName] = useState("");

    if (!playerName) {
        return (
            <PlayerInputName setPlayerName={setPlayerName}></PlayerInputName>
        );
    }
    return <Welcome playerName={playerName}></Welcome>;
};
export default Home;
