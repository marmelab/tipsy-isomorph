import React, { useState } from "react";
import PlayerInputName from "../../lib/shared/PlayerNameInput.jsx";
import Welcome from "../../lib/home/Welcome.jsx";

const Home = () => {
    const [playerName, setPlayerName] = useState("");

    if (!playerName) {
        return <PlayerInputName onPress={setPlayerName}></PlayerInputName>;
    }
    return <Welcome playerName={playerName}></Welcome>;
};
export default Home;
