import React from "react";
import { Text, View, StyleSheet } from "react-native-web";
import Head from "next/head";
import PropTypes from "prop-types";

const Waiting = ({ playerId, host, game }) => {
    if (!host && typeof window !== "undefined") {
        host = window.location.origin;
    }
    return (
        <View style={styles.container}>
            <Head>
                <noscript>
                    <meta
                        httpEquiv="refresh"
                        content={`3; url=/tipsy/game?id=${game.id}&playerId=${playerId}`}
                    />
                </noscript>
            </Head>
            <Text style={styles.title}>Tipsy</Text>
            <Text style={styles.text}>Waiting for opponent</Text>
            <Text style={styles.text}>Invite link :</Text>
            <Text style={styles.text} accessibilityLabel="Join link">
                {`${host}/tipsy/game/${game.id}/join`}
            </Text>
        </View>
    );
};

Waiting.propTypes = {
    playerId: PropTypes.string.isRequired,
    host: PropTypes.string,
    game: PropTypes.object.isRequired,
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
        flex: 1,
        color: "white",
        fontSize: 30,
    },
    title: {
        fontFamily: "Lobster",
        fontSize: 90,
        color: "white",
        paddingBottom: 50,
    },
});

export default Waiting;
