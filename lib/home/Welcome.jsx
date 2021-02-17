import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native-web";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import AdaptiveButton from "../../lib/shared/AdaptiveButton.jsx";
import GridLoader from "react-spinners/GridLoader";

const Welcome = ({ playerName }) => {
    const [creatingGame, setCreatingGame] = useState(false);
    const router = useRouter();
    const handleNewGame = () => {
        setCreatingGame(true);
        router.push(`/tipsy/game?playerName=${playerName}`);
    };
    if (creatingGame) {
        return (
            <View style={styles.container}>
                <GridLoader color="white" size={50} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <AdaptiveButton
                action={handleNewGame}
                noJsFallBack={`/tipsy/game?playerName=${playerName}`}
            >
                <Text style={styles.goButton}>New game</Text>
            </AdaptiveButton>
        </View>
    );
};

Welcome.propTypes = {
    playerName: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "steelblue",
        fontFamily: "Lobster",
    },
    textInput: {
        height: 50,
        width: 200,
        margin: 50,
        paddingLeft: 20,
        borderColor: "white",
        color: "white",
        borderWidth: 2,
        borderRadius: 30,
    },
    goButton: {
        fontFamily: "Lobster",
        fontSize: 30,
        height: 50,
        width: 170,
        margin: 50,
        paddingLeft: 20,
        color: "steelblue",
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default Welcome;
