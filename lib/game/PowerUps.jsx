import React from "react";
import { Text, View, StyleSheet } from "react-native-web";
import AdaptiveButton from "../shared/AdaptiveButton.jsx";
import PropTypes from "prop-types";

const PowerUps = ({ game, playerId, usePower }) => {
    const currentPlayer = game.players.find((player) => player.current);
    if (currentPlayer.id === playerId) {
        return (
            <View>
                {Object.entries(currentPlayer.powerUps).map(
                    ([powerUp, number]) => {
                        return (
                            <AdaptiveButton
                                key={powerUp}
                                onPress={() => usePower(powerUp)}
                                href={`/tipsy/game?id=${game.id}&action=powerUp&powerUp=${powerUp}&playerId=${playerId}`}
                            >
                                <Text>
                                    {powerUp} - {number}
                                </Text>
                            </AdaptiveButton>
                        );
                    }
                )}
            </View>
        );
    }
    return null;
};

PowerUps.propTypes = {
    game: PropTypes.object.isRequired,
    playerId: PropTypes.string.isRequired,
    usePower: PropTypes.func.isRequired,
};

export default PowerUps;
