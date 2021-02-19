import React, { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native-web";
import Emoji from "./Emoji.jsx";
import AdaptiveButton from "../shared/AdaptiveButton.jsx";
import PropTypes from "prop-types";

const powerUpsEmoji = {
    beer: "🍺",
    whisky: "🥃",
};
const PowerUps = ({ game, playerId, usePower }) => {
    const currentPlayer = game.players.find((player) => player.current);
    const [modalVisible, setModalVisible] = useState(false);
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
                                    disabled={number == 0}
                                />
                                {number > 0 ? (
                                    <Text
                                        style={{
                                            flex: 1,
                                            borderRadius: 20,
                                            position: "absolute",
                                            top: 20,
                                            left: 15,
                                            color: "steelblue",
                                            backgroundColor: "white",
                                            padding: 5,
                                            fontDecoration: "bold",
                                            fontSize: 17,
                                        }}
                                    >
                                        {number}
                                    </Text>
                                ) : null}
                            </AdaptiveButton>
                        );
                    }
                )}
                <AdaptiveButton onPress={() => setModalVisible(!modalVisible)}>
                    <Emoji label="PowerUps Info" symbol="❓" />
                </AdaptiveButton>
                <View style={[modalVisible ? {} : { display: "none" }]}>
                    <Emoji label="PowerUps Info" symbol="🍺" /> add 1 turn
                    <Emoji label="PowerUps Info" symbol="🥃" /> switch colors
                </View>
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
