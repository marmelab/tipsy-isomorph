import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native-web";
import PropTypes from "prop-types";

const Welcome = ({ playerName }) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.goButton}
                title="New game"
                onPress={() => alert("NewGame")}
            >
                <Text style={styles.goButton}>New game</Text>
            </Pressable>
            <Pressable
                title="Join game"
                onPress={() => alert("JoinGame" + playerName)}
            >
                <Text style={styles.goButton}>Join game</Text>
            </Pressable>
        </View>
    );
};

Welcome.propTypes = {
    playerName: PropTypes.string,
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
