import { TextInput, View, StyleSheet, Text, Pressable } from "react-native-web";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PlayerInputName = ({ onPress, onPressFallBack }) => {
    const [playerName, updatePlayerName] = useState("");
    const [jsOnlyStyle, setJsOnlyStyle] = useState({ display: "none" });

    useEffect(() => {
        if (jsOnlyStyle.display) {
            setJsOnlyStyle({});
        }
    }, [jsOnlyStyle, setJsOnlyStyle]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tipsy</Text>
            <TextInput
                label="playerName"
                placeholder="Player name"
                placeholderTextColor="white"
                selectionColor="white"
                onChangeText={updatePlayerName}
                style={[styles.textInput, jsOnlyStyle]}
            ></TextInput>
            <Pressable
                title="Go"
                disabled={!playerName || playerName === "bot"}
                onPress={() => onPress(playerName)}
            >
                <Text style={[styles.goButton, jsOnlyStyle]}>Go</Text>
            </Pressable>
            <noscript>
                <form action={onPressFallBack} method="get">
                    <input
                        name="playerName"
                        style={{
                            height: 50,
                            width: 200,
                            margin: 50,
                            paddingLeft: 20,
                            borderColor: "white",
                            fontSize: 20,
                            borderWidth: 2,
                            borderRadius: 30,
                        }}
                    ></input>
                    <input
                        type="submit"
                        value="Go"
                        style={{
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
                        }}
                    ></input>
                </form>
            </noscript>
        </View>
    );
};
PlayerInputName.propTypes = {
    onPress: PropTypes.func,
    onPressFallBack: PropTypes.string,
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
