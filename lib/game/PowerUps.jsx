import React from "react";
import { View } from "react-native-web";
import Emoji from "./Emoji.jsx";
import AdaptiveButton from "../shared/AdaptiveButton.jsx";
import PropTypes from "prop-types";

const powerUpsEmoji = {
    beer: "🍺",
    whisky: "🥃",
};
const PowerUps = ({ game, playerId, usePower }) => {
    const currentPlayer = game.players.find((player) => player.current);
    if (currentPlayer.id === playerId) {
        return (
            <View style={{ flex: 1, flexDirection: "row", marginTop: 40 }}>
                {Object.entries(currentPlayer.powerUps).map(
                    ([powerUp, number]) => {
                        return (
                            <AdaptiveButton
                                key={powerUp}
                                onPress={() => usePower(powerUp)}
                                href={`/tipsy/game?id=${game.id}&action=powerUp&powerUp=${powerUp}&playerId=${playerId}`}
                            >
                                <Emoji
                                    label={powerUp}
                                    symbol={powerUpsEmoji[powerUp]}
                                />
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
