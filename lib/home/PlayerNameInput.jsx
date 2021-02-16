import { Pressable, TextInput, View, StyleSheet, Text } from "react-native-web";
import React, { useState } from "react";
import PropTypes from "prop-types";

const PlayerInputName = ({ setPlayerName }) => {
    const [playerName, updatePlayerName] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tipsy</Text>
            <TextInput
                placeholder="Player name"
                placeholderTextColor="white"
                selectionColor="white"
                onChangeText={updatePlayerName}
                style={styles.textInput}
            ></TextInput>
            <Pressable
                title="Go"
                disabled={!playerName || playerName === "bot"}
                onPress={() => setPlayerName(playerName)}
            >
                <Text style={styles.goButton}>Go</Text>
            </Pressable>
        </View>
    );
};
PlayerInputName.propTypes = {
    setPlayerName: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "steelblue",
        color: "white",
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
        fontSize: 30,
        height: 50,
        width: 70,
        margin: 50,
        paddingLeft: 20,
        color: "steelblue",
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Lobster",
    },
    title: { fontFamily: "Lobster", fontSize: 90, color: "white" },
});

export default PlayerInputName;
