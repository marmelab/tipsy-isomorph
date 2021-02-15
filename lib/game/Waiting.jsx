import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native-web";
import PropTypes from "prop-types";

const backgroundColor = "#fff";

const Waiting = ({ playerName }) => {
    return (
        <View style={styles.container}>
            <Text>{playerName}</Text>
            <Text>Waiting for opponent</Text>
        </View>
    );
};

Waiting.propTypes = {
    playerName: PropTypes.string.isRequired,
    gameId: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        // To avoid overlapping status bar on android : https://stackoverflow.com/questions/51289587/react-native-how-to-use-safeareaview-for-android-notch-devices/55017347
        paddingTop: Platform.OS === "android" ? 25 : 0,
    },
});

export default Waiting;
