import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native-web";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import AdaptiveButton from "../../lib/shared/AdaptiveButton.jsx";
import GridLoader from "react-spinners/GridLoader";

const Welcome = ({ playerName }) => {
    const [creatingGame, setCreatingGame] = useState(false);
    const router = useRouter();
    const handleNewGame = (quickGame = false) => {
        setCreatingGame(true);
        router.push(
            `/tipsy/game?playerName=${encodeURIComponent(playerName)}${
                quickGame ? "&quickGame=true" : ""
            }`
        );
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
            <Text style={styles.title}>Tipsy</Text>
            <Text style={styles.text}>Welcome {playerName}</Text>
            <AdaptiveButton
                onPress={() => handleNewGame(false)}
                href={`/tipsy/game?playerName=${encodeURIComponent(
                    playerName
                )}`}
            >
                <Text style={styles.goButton}>Play with friends</Text>
            </AdaptiveButton>

            <AdaptiveButton
                onPress={() => handleNewGame(true)}
                href={`/tipsy/game?playerName=${encodeURIComponent(
                    playerName
                )}&quickGame=true`}
            >
                <Text style={styles.goButton}>Quick game</Text>
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
    text: {
        color: "white",
        fontSize: 30,
    },
    goButton: {
        flex: 1,
        flexGrow: 1,
        fontFamily: "Lobster",
        fontSize: 30,
        marginTop: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        color: "steelblue",
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: "Lobster",
        fontSize: 90,
        color: "white",
        paddingBottom: 50,
    },
});
export default Welcome;
