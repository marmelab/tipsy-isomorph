import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Game from "./game/Game.jsx";
import gameApi from "./api/GameApi.jsx";

export default function App() {
    const [game, setGame] = useState();
    const [gameState, setGameState] = useState("pending");
    useEffect(() => {
        if (gameState == "pending") {
            setGameState("loading");
            gameApi
                .newGame("Brice")
                .then((data) => {
                    return gameApi.joinGame("Maxime", data.id);
                })
                .then((data) => {
                    setGame(data);
                    setGameState("loaded");
                });
        }
    });
    return (
        <View style={styles.container}>
            {gameState == "loaded" ? <Game game={game}></Game> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    link: {
        color: "blue",
    },
    textContainer: {
        alignItems: "center",
        marginTop: 16,
    },
    text: {
        alignItems: "center",
        fontSize: 24,
        marginBottom: 24,
    },
});
