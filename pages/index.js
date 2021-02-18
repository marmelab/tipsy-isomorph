import { StyleSheet, View } from "react-native-web";
import React from "react";
import Home from "./tipsy/home.jsx";

export default function App() {
    return (
        <View style={styles.container}>
            <Home />
        </View>
    );
}

export async function getServerSideProps({ res }) {
    res.setHeader("Location", `/tipsy/home`);
    res.statusCode = 302;
    return { props: {} };
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
});
