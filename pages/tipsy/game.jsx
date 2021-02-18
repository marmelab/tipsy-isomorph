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
            setGame(game);
        });
    }, [game, setGame]);

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
        return (
            <div>
                <Head>
                    <noscript>
                        <meta
                            httpEquiv="refresh"
                            content={`3; url=/tipsy/game?id=${game.id}&playerId=${playerId}`}
                        />
                    </noscript>
                </Head>
                <Waiting game={game} host={host}></Waiting>
            </div>
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
            <GameStatus game={game} playerId={playerId}></GameStatus>
            <View style={styles.game}>
                {game.currentPlayer === playerId && game.remainingTurns > 0 ? (
                    <AdaptiveButton
                        onPress={() => tilt("west", game.currentPlayer)}
                        href={`/tipsy/game?id=${game.id}&action=tilt&direction=west&playerId=${playerId}`}
                        style="leftArrow"
                    ></AdaptiveButton>
                ) : null}
                <View style={styles.board}>
                    {game.currentPlayer === playerId &&
                    game.remainingTurns > 0 ? (
                        <AdaptiveButton
                            onPress={() => tilt("north", game.currentPlayer)}
                            href={`/tipsy/game?id=${game.id}&action=tilt&direction=north&playerId=${playerId}`}
                            style="upArrow"
                        ></AdaptiveButton>
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
                    {game.currentPlayer === playerId &&
                    game.remainingTurns > 0 ? (
                        <AdaptiveButton
                            onPress={() => tilt("south", game.currentPlayer)}
                            href={`/tipsy/game?id=${game.id}&action=tilt&direction=south&playerId=${playerId}`}
                            style="downArrow"
                        ></AdaptiveButton>
                    ) : null}
                </View>

                {game.currentPlayer === playerId && game.remainingTurns > 0 ? (
                    <AdaptiveButton
                        onPress={() => tilt("east", game.currentPlayer)}
                        href={`/tipsy/game?id=${game.id}&action=tilt&direction=east&playerId=${playerId}`}
                        style="rightArrow"
                    ></AdaptiveButton>
                ) : null}
            </View>
            <PowerUps
                game={game}
                playerId={playerId}
                usePower={usePower}
            ></PowerUps>
            {game.remainingTurns == 0 &&
            (game.fallenPucks[0] > 0 || game.fallenPucks[1] > 0) ? (
                <AdaptiveButton
                    onPress={() => replace()}
                    href={`/tipsy/game?id=${game.id}&action=replace&playerId=${playerId}`}
                >
                    <Text>Replace</Text>
                </AdaptiveButton>
            ) : null}
        </View>
    );
};

Game.propTypes = {
    currentGame: PropTypes.object,
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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    loading: {
        fontSize: 30,
        fontFamily: "Lobster",
        color: "white",
    },
});

export default Game;
