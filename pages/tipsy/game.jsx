import React, { useState, useCallback, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native-web";

import GameStatus from "../../lib/game/GameStatus.jsx";
import gameApi from "../../lib/game/GameApi.js";
import Cell from "../../lib/game/Cell.jsx";
import AdaptiveButton from "../../lib/shared/AdaptiveButton.jsx";
import isGameFull from "../../lib/shared/tools";
import Waiting from "../../lib/game/Waiting.jsx";
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

const Game = ({ currentGame, playerName, host }) => {
    const [error, setError] = useState();
    const [tiltState, setTiltState] = useState();
    const [replaceState, setReplaceState] = useState();
    const [game, setGame] = useState(currentGame);
    const updateGame = () => {
        gameApi.getGame(game.id).then((game) => {
            setGame(game);
        });
    };
    useEffect(() => {
        const updateGameInterval = setInterval(function () {
            if (game.currentPlayer !== playerName || !isGameFull(game)) {
                updateGame();
            }
        }, 1000);

        return () => {
            clearInterval(updateGameInterval);
        };
    }, [game.id]);

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
            .then(() => {
                updateGame();
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
        return <Waiting game={game} host={host}></Waiting>;
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
                {game.currentPlayer === playerName &&
                game.remainingTurns > 0 ? (
                    <AdaptiveButton
                        action={() => tilt("west", game.currentPlayer)}
                        noJsFallBack={`/tipsy/game?id=${game.id}&action=tilt&direction=west`}
                        style={styles.leftArrow}
                    >
                        ◄
                    </AdaptiveButton>
                ) : null}
                <View style={styles.board}>
                    {game.currentPlayer === playerName &&
                    game.remainingTurns > 0 ? (
                        <AdaptiveButton
                            action={() => tilt("north", game.currentPlayer)}
                            noJsFallBack={`/tipsy/game?id=${game.id}&action=tilt&direction=north`}
                            style={styles.upArrow}
                        >
                            ▲
                        </AdaptiveButton>
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
                    {game.currentPlayer === playerName &&
                    game.remainingTurns > 0 ? (
                        <AdaptiveButton
                            action={() => tilt("south", game.currentPlayer)}
                            noJsFallBack={`/tipsy/game?id=${game.id}&action=tilt&direction=south`}
                            style={styles.downArrow}
                        >
                            ▼
                        </AdaptiveButton>
                    ) : null}
                </View>

                {game.currentPlayer === playerName &&
                game.remainingTurns > 0 ? (
                    <AdaptiveButton
                        action={() => tilt("east", game.currentPlayer)}
                        noJsFallBack={`/tipsy/game?id=${game.id}&action=tilt&direction=east`}
                        style={styles.rightArrow}
                    >
                        ►
                    </AdaptiveButton>
                ) : null}
            </View>
            {game.remainingTurns == 0 &&
            (game.fallenPucks[0] > 0 || game.fallenPucks[1] > 0) ? (
                <AdaptiveButton
                    action={() => replace()}
                    noJsFallBack={`/tipsy/game?id=${game.id}&action=replace`}
                    style={styles.rightArrow}
                >
                    Replace
                </AdaptiveButton>
            ) : null}
        </View>
    );
};

Game.propTypes = {
    currentGame: PropTypes.object,
    playerName: PropTypes.string.isRequired,
    host: PropTypes.string,
};

export async function getServerSideProps({ query, res, req }) {
    const { id, action, direction, playerName } = query;
    let game;
    switch (action) {
        case "tilt":
            game = await gameApi.getGame(id);
            game = await gameApi.tilt(direction, game.currentPlayer, game.id);
            break;
        case "replace":
            game = await gameApi.replace(id);
            break;
        default:
            if (id) {
                game = await gameApi.getGame(id);
            } else {
                game = await gameApi.newGame(playerName);
                res.writeHead(302, {
                    Location: `/tipsy/game?id=${game.id}&playerName=${playerName}`,
                });
                res.end();
                return { props: {} };
            }
            break;
    }

    return {
        props: {
            currentGame: game,
            playerName,
            host: `http://${req.headers.host}`,
        },
    };
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
