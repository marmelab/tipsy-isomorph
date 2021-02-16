import { StyleSheet, View } from "react-native";
import React from "react";
import Game from "./tipsy/game.jsx";

export default function App() {
    return (
        <View style={styles.container}>
            <Game />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
});
