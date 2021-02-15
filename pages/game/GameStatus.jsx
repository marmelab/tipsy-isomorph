import React, { useMemo } from "react";
import { Text, View, StyleSheet } from "react-native-web";
import PropTypes from "prop-types";

const GameStatus = ({ game }) => {
    const currentPlayerColor = useMemo(() => {
        return game.players.find((player) => player.current).color;
    }, [game.players]);
    const getColorStyle = () => {
        switch (currentPlayerColor) {
            case "blue":
                return styles.blue;
            case "red":
                return styles.red;
        }
    };
    return (
        <View style={styles.container}>
            <Text style={[styles.text, getColorStyle()]}>
                {`${game.currentPlayer} turn!`}
            </Text>
            <Text style={[styles.text, getColorStyle()]}>
                {game.remainingTurns}
            </Text>
        </View>
    );
};
GameStatus.propTypes = {
    game: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        margin: 100,
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
