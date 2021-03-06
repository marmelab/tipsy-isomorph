import React, { useState, useCallback, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native-web";

import GameStatus from "../../lib/game/GameStatus.jsx";
import PowerUps from "../../lib/game/PowerUps.jsx";
import {
    getGame,
    replacePuck,
    tiltGame,
    createGame,
    usePowerUp,
} from "../../lib/game/GameApi.js";
import Cell from "../../lib/game/Cell.jsx";
import Puck from "../../lib/game/Puck.jsx";
import AdaptiveButton from "../../lib/shared/AdaptiveButton.jsx";
import isGameFull from "../../lib/shared/tools";
import Waiting from "../../lib/game/Waiting.jsx";
import PropTypes from "prop-types";
import Head from "next/head";

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

const Game = ({ currentGame, playerId, host }) => {
    const [error, setError] = useState();
    const [tiltState, setTiltState] = useState("pending");
    const [replaceState, setReplaceState] = useState();
    const [usePowerState, setUsePowerState] = useState();
    const [game, setGame] = useState(currentGame);
    const [winner, setWinner] = useState();

    useEffect(() => {
        const updateGameInterval = setInterval(function () {
            if (game.currentPlayer !== playerId || !isGameFull(game)) {
                updateGame();
            }
        }, 2000);

        return () => {
            clearInterval(updateGameInterval);
        };
    }, [game.id]);

    const updateGame = useCallback(() => {
        getGame(game.id).then((game) => {
            const blackPuck = game.pucks.find((puck) => puck.color === "black");
            if (
                blackPuck.position.x < 0 ||
                blackPuck.position.x > 6 ||
                blackPuck.position.y < 0 ||
                blackPuck.position.y > 6
            ) {
                setWinner(game.currentPlayer);
                return;
            }
            const currentPlayer = game.players.find(
                (player) => player.id === game.currentPlayer
            );
            const opponent = game.players.find(
                (player) => player.id != game.currentPlayer
            );
            const currentPlayerFlippedPuck = game.pucks.filter(
                (puck) =>
                    puck.color === currentPlayer.color && puck.flipped === true
            );
            const opponentFlippedPuck = game.pucks.filter(
                (puck) => puck.color === opponent.color && puck.flipped === true
            );
            if (opponentFlippedPuck.length == 6) {
                setWinner(opponent.id);
                return;
            }
            if (currentPlayerFlippedPuck.length == 6) {
                setWinner(currentPlayer.id);
                return;
            }

            setGame(game);
        });
    }, [game, setGame, setWinner]);

    const usePower = useCallback(
        (powerUp) => {
            if (usePowerState === "loading") {
                return;
            }
            setUsePowerState("loading");
            usePowerUp(game.id, playerId, powerUp)
                .catch((error) => {
                    setError(error);
                })
                .then(() => {
                    updateGame();
                })
                .finally(() => {
                    setReplaceState("pending");
                });
        },
        [usePowerState, setUsePowerState]
    );

    const replace = useCallback(() => {
        if (replaceState === "loading") {
            return;
        }
        setReplaceState("loading");
        replacePuck(game.id)
            .catch((error) => {
                setError(error);
            })
            .then(() => {
                updateGame();
            })
            .finally(() => {
                setReplaceState("pending");
            });
    }, [replaceState, setReplaceState, game.id, error, setError, setGame]);

    const tilt = useCallback(
        (direction, playerId) => {
            if (tiltState === "loading") {
                return;
            }
            setTiltState("loading");
            tiltGame(direction, playerId, game.id)
                .catch((error) => {
                    setError(error);
                })
                .then(() => {
                    updateGame();
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
    if (!isGameFull(game)) {
        return <Waiting game={game} host={host} playerId={playerId}></Waiting>;
    }
    if (winner) {
        return (
            <View
                style={[
                    {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "steelblue",
                        fontFamily: "Lobster",
                    },
                ]}
            >
                <Text
                    style={{
                        flex: 1,
                        color: "white",
                        fontSize: 30,
                    }}
                >
                    Player{" "}
                    {game.players.find((player) => player.id === winner).name}{" "}
                    win
                </Text>
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
            <Head>
                <noscript>
                    <meta
                        httpEquiv="refresh"
                        content={`3; url=/tipsy/game?id=${game.id}&playerId=${playerId}`}
                    />
                </noscript>
            </Head>
            <View
                accessibilityLabel="Game status"
                style={[
                    {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                ]}
            >
                <GameStatus game={game} playerId={playerId}></GameStatus>
            </View>
            <View style={styles.game}>
                {game.currentPlayer === playerId && game.remainingTurns > 0 ? (
                    <AdaptiveButton
                        onPress={() => tilt("west", game.currentPlayer)}
                        href={`/tipsy/game?id=${game.id}&action=tilt&direction=west&playerId=${playerId}`}
                        styleName="leftArrow"
                    ></AdaptiveButton>
                ) : null}
                <View style={styles.board} accessibilityLabel="Board">
                    {game.currentPlayer === playerId &&
                    game.remainingTurns > 0 ? (
                        <AdaptiveButton
                            onPress={() => tilt("north", game.currentPlayer)}
                            href={`/tipsy/game?id=${game.id}&action=tilt&direction=north&playerId=${playerId}`}
                            styleName="upArrow"
                        ></AdaptiveButton>
                    ) : null}

                    <View style={{ width: 300 }}>
                        {game.pucks.map((puck) => {
                            return (
                                <Puck
                                    key={`${puck.position.x}-${puck.position.y}`}
                                    puck={puck}
                                ></Puck>
                            );
                        })}
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
                    </View>
                    {game.currentPlayer === playerId &&
                    game.remainingTurns > 0 ? (
                        <AdaptiveButton
                            onPress={() => tilt("south", game.currentPlayer)}
                            href={`/tipsy/game?id=${game.id}&action=tilt&direction=south&playerId=${playerId}`}
                            styleName="downArrow"
                        ></AdaptiveButton>
                    ) : null}
                </View>
                {game.currentPlayer === playerId && game.remainingTurns > 0 ? (
                    <AdaptiveButton
                        onPress={() => tilt("east", game.currentPlayer)}
                        href={`/tipsy/game?id=${game.id}&action=tilt&direction=east&playerId=${playerId}`}
                        styleName="rightArrow"
                    ></AdaptiveButton>
                ) : null}
            </View>
            <View
                style={[
                    {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                ]}
            >
                {game.remainingTurns == 0 &&
                game.currentPlayer === playerId &&
                (game.fallenPucks[0] > 0 || game.fallenPucks[1] > 0) ? (
                    <AdaptiveButton
                        onPress={() => replace()}
                        href={`/tipsy/game?id=${game.id}&action=replace&playerId=${playerId}`}
                        styleName="replace"
                    >
                        <Text style={styles.replace}>Replace</Text>
                    </AdaptiveButton>
                ) : null}
            </View>
            <View
                style={[
                    {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                ]}
            >
                <PowerUps
                    game={game}
                    playerId={playerId}
                    usePower={usePower}
                ></PowerUps>
            </View>
        </View>
    );
};

Game.propTypes = {
    currentGame: PropTypes.object.isRequired,
    playerId: PropTypes.string.isRequired,
    host: PropTypes.string,
};

export async function getServerSideProps({ query, req }) {
    let { id, action, direction, playerName, playerId, quickGame } = query;
    let game;
    switch (action) {
        case "tilt":
            game = await getGame(id);
            game = await tiltGame(direction, game.currentPlayer, game.id);
            break;
        case "replace":
            game = await replacePuck(id);
            break;
        default: {
            if (id) {
                game = await getGame(id);
                break;
            }
            const [newGame, newPlayerId] = await createGame(
                playerName ? playerName : "Anonymous",
                quickGame
            );
            game = newGame;
            playerId = newPlayerId;
            break;
        }
    }

    return {
        props: {
            currentGame: game,
            playerId,
            host: `http://${req.headers.host}`,
        },
    };
}

const styles = StyleSheet.create({
    jsonly: {
        display: "none",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    board: {
        flex: 1,
    },
    game: {
        flex: 1,
        paddingTop: 120,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    loading: {
        fontSize: 30,
        fontFamily: "Lobster",
        color: "white",
    },
    replace: {
        flex: 1,
        marginTop: 50,
        padding: 10,
        fontSize: 20,
        textAlign: "center",
        height: 50,
        color: "white",
        backgroundColor: "steelblue",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default Game;
