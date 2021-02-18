import React from "react";
import { Text, View, StyleSheet } from "react-native-web";
import PropTypes from "prop-types";

const GameStatus = ({ game, playerId }) => {
    const currentPlayer = () => {
        return game.players.find((player) => player.current);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles[currentPlayer().color]]}>
                {`It's ${
                    currentPlayer().id === playerId
                        ? "your"
                        : currentPlayer().name
                } turn!`}
            </Text>
            <Text style={[styles.text, styles[currentPlayer().color]]}>
                {game.remainingTurns}
            </Text>
        </View>
    );
};
GameStatus.propTypes = {
    game: PropTypes.object.isRequired,
    playerId: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        marginTop: 10,
        marginBottom: 50,
        height: 30,
        alignItems: "center",
        alignContent: "center",
        color: "white",
    },
    text: {
        fontFamily: "Lobster",
        fontSize: 35,
    },
    red: {
        color: "lightsalmon",
    },
    blue: {
        color: "steelblue",
    },
    loading: {
        fontSize: 30,
        fontFamily: "Lobster",
        color: "white",
    },
});
export default GameStatus;
