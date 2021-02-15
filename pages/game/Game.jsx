import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native-web";
import GameStatus from "./GameStatus.jsx";
import PropTypes from "prop-types";
import gameApi from "../api/GameApi.jsx";
import Cell from "./Cell.jsx";

const boardObstacles = [
    ["topleft", "exit", "top", "top", "top", "top", "topright"],
    ["left", "obstacle", "cell", "cell", "cell", "obstacle", "exit"],
    ["left", "cell", "obstacle", "cell", "obstacle", "cell", "right"],
    ["obstacle", "cell", "cell", "cell", "cell", "cell", "obstacle"],
    ["left", "cell", "obstacle", "cell", "obstacle", "cell", "right"],
    ["exit", "obstacle", "cell", "cell", "cell", "obstacle", "right"],
    [
        "bottomleft",
        "bottom",
        "bottom",
        "obstacle",
        "bottom",
        "exit",
        "bottomright",
    ],
];

const Game = ({ playerName, game, updateGame }) => {
    const [error, setError] = useState();
    const [tiltState, setTiltState] = useState();
    const [replaceState, setReplaceState] = useState();

    const replace = useCallback(() => {
        if (replaceState === "loading") {
            return;
        }
        setReplaceState("loading");
        gameApi
            .replace(game.id)
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                updateGame();
                setReplaceState("pending");
            });
    }, [replaceState, setReplaceState, game.id, error, setError]);

    const tilt = useCallback(
        (direction) => {
            if (tiltState === "loading") {
                return;
            }
            setTiltState("loading");
            gameApi
                .tilt(direction, playerName, game.id)
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    updateGame();
                    setTiltState("pending");
                });
        },
        [tiltState, game.id, playerName, error, setTiltState, setError]
    );

    if (error) {
        return (
            <View>
                <Text>{error.message}</Text>
            </View>
        );
    }

    return (
        <View
            style={[
                {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                },
            ]}
        >
            <GameStatus game={game} playerName={playerName}></GameStatus>
            <View style={styles.game}>
                {game.currentPlayer == playerName && game.remainingTurns > 0 ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => tilt("west")}
                    >
                        <View style={styles.leftArrow}>
                            <Text>◄</Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
                <View style={styles.board}>
                    {game.currentPlayer == playerName &&
                    game.remainingTurns > 0 ? (
                        <TouchableOpacity onPress={() => tilt("north")}>
                            <View style={styles.upArrow}>
                                <Text>▲</Text>
                            </View>
                        </TouchableOpacity>
                    ) : null}
                    {boardObstacles.map((row, y) => {
                        return (
                            <View key={"row" + y} style={styles.row}>
                                {row.map((cellType, x) => {
                                    return (
                                        <Cell
                                            key={`cell-${x}-${y}`}
                                            x={x}
                                            y={y}
                                            game={game}
                                            cellType={cellType}
                                        />
                                    );
                                })}
                            </View>
                        );
                    })}
                    {game.currentPlayer == playerName &&
                    game.remainingTurns > 0 ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => tilt("south")}
                        >
                            <View style={styles.downArrow}>
                                <Text>▼</Text>
                            </View>
                        </TouchableOpacity>
                    ) : null}
                </View>

                {game.currentPlayer == playerName && game.remainingTurns > 0 ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => tilt("east")}
                    >
                        <View style={styles.rightArrow}>
                            <Text>►</Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
            </View>
            {game.remainingTurns == 0 &&
            (game.fallenPucks[0] > 0 || game.fallenPucks[1] > 0) ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => replace()}
                >
                    <Text>Replace pucks</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        height: 36,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    board: {
        flex: 1,
        marginTop: 20,
        marginLeft: 20,
    },
    game: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    loading: {
        fontSize: 30,
        fontFamily: "Lobster",
        color: "white",
    },
    upArrow: {
        height: 30,
        width: 300,
        alignItems: "center",
    },
    rightArrow: {
        height: 300,
        width: 30,
        justifyContent: "center",
    },
    downArrow: {
        height: 20,
        width: 300,
        alignItems: "center",
    },
    leftArrow: {
        height: 300,
        width: 30,
        justifyContent: "center",
    },
});

Game.propTypes = {
    updateGame: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default Game;
