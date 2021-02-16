import React, { useState, useCallback, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native-web";

import GameStatus from "../../lib/game/GameStatus.jsx";
import gameApi from "../../lib/game/GameApi.jsx";
import defaultGame from "../../lib/game/default-game.json";
import Cell from "../../lib/game/Cell.jsx";
import PropTypes from "prop-types";

const boardObstacles = [
    ["topleft", "exit", "top", "obstacle", "top", "top", "topright"],
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

const Game = ({ currentGame }) => {
    const [error, setError] = useState();
    const [tiltState, setTiltState] = useState();
    const [replaceState, setReplaceState] = useState();
    const [game, setGame] = useState(currentGame ? currentGame : defaultGame);
    const [gameState, setGameState] = useState(
        currentGame ? "loaded" : "pending"
    );
    const [jsOnlyStyle, setJsOnlyStyle] = useState({ display: "none" });

    useEffect(() => {
        if (!process.browser) {
            return;
        }
        if (gameState != "pending") {
            return;
        }

        setGameState("loading");
        gameApi
            .newGame("Brice")
            .then((data) => {
                return gameApi.joinGame("Maxime", data.id);
            })
            .then((data) => {
                setGame(data);
            })
            .finally(() => {
                setGameState("loaded");
            });
    }, [setGameState, setGame, gameState]);

    useEffect(() => {
        if (jsOnlyStyle.display) {
            setJsOnlyStyle({});
        }
    }, [jsOnlyStyle, setJsOnlyStyle]);

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
            .then((data) => {
                setGame(data);
            })
            .finally(() => {
                setReplaceState("pending");
            });
    }, [replaceState, setReplaceState, game.id, error, setError, setGame]);

    const tilt = useCallback(
        (direction, playerName) => {
            if (tiltState === "loading") {
                return;
            }
            setTiltState("loading");
            gameApi
                .tilt(direction, playerName, game.id)
                .catch((error) => {
                    setError(error);
                })
                .then((data) => {
                    setGame(data);
                })
                .finally(() => {
                    setTiltState("pending");
                });
        },
        [tiltState, game.id, error, setTiltState, setError]
    );

    if (error) {
        return (
            <View>
                <Text>{error.message}</Text>
            </View>
        );
    }
    if (gameState != "loaded") {
        return (
            <View style={styles.loading}>
                <Text>Loading</Text>
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
            <GameStatus game={game}></GameStatus>
            <View style={styles.game}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => tilt("west", game.currentPlayer)}
                >
                    <View style={styles.leftArrow}>
                        <noscript>
                            <a
                                href={`/tipsy/game?id=${game.id}&action=tilt&direction=west`}
                            >
                                ◄
                            </a>
                        </noscript>
                        <Text style={jsOnlyStyle}>◄</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.board}>
                    <TouchableOpacity
                        onPress={() => tilt("north", game.currentPlayer)}
                    >
                        <View style={styles.upArrow}>
                            <noscript>
                                <a
                                    href={`/tipsy/game?id=${game.id}&action=tilt&direction=north`}
                                >
                                    ▲
                                </a>
                            </noscript>
                            <Text style={jsOnlyStyle}>▲</Text>
                        </View>
                    </TouchableOpacity>
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => tilt("south", game.currentPlayer)}
                    >
                        <View style={styles.downArrow}>
                            <noscript>
                                <a
                                    href={`/tipsy/game?id=${game.id}&action=tilt&direction=south`}
                                >
                                    ▼
                                </a>
                            </noscript>
                            <Text style={jsOnlyStyle}>▼</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => tilt("east", game.currentPlayer)}
                >
                    <View style={styles.rightArrow}>
                        <noscript>
                            <a
                                href={`/tipsy/game?id=${game.id}&action=tilt&direction=east`}
                            >
                                ►
                            </a>
                        </noscript>
                        <Text style={jsOnlyStyle}>►</Text>
                    </View>
                </TouchableOpacity>
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

Game.propTypes = {
    currentGame: PropTypes.object,
};

export async function getServerSideProps({ query, res }) {
    const { id, action, direction } = query;
    let game;
    switch (action) {
        case "tilt":
            game = await gameApi.getGame(id);
            game = await gameApi.tilt(direction, game.currentPlayer, game.id);
            break;
        case "replace":
            break;
        default:
            if (id) {
                game = await gameApi.getGame(id);
            } else {
                game = await gameApi.newGame("Brice");
                game = await gameApi.joinGame("Maxime", game.id);
                res.writeHead(302, { Location: `/tipsy/game?id=${game.id}` });
                res.end();
                return;
            }
            break;
    }

    return { props: { currentGame: game } };
}

const styles = StyleSheet.create({
    jsonly: {
        display: "none",
    },
    row: {
        height: 36,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    board: {
        flex: 1,
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

export default Game;
