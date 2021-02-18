import React from "react";
import { Text, View, StyleSheet } from "react-native-web";
import PropTypes from "prop-types";

const PowerUps = ({ game, playerId }) => {
    const currentPlayer = game.players.find((player) => player.current);
    if (currentPlayer.id === playerId) {
        return (
            <View>
                {Object.entries(currentPlayer.powerUps).map(
                    ([powerUp, number]) => {
                        return (
                            <Text key={powerUp}>
                                {powerUp} - {number}
                            </Text>
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
};

export default PowerUps;
