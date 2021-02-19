import { StyleSheet } from "react-native-web";

export const globalStyle = StyleSheet.create({
    upArrow: {
        marginBottom: 25,
        borderBottomWidth: 30,
        borderLeftWidth: 150,
        borderRightWidth: 150,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "grey",
        justifyContent: "center",
    },
    rightArrow: {
        borderTopWidth: 150,
        borderBottomWidth: 150,
        borderLeftWidth: 30,
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        borderLeftColor: "grey",
        justifyContent: "center",
    },
    downArrow: {
        marginTop: 25,
        borderTopWidth: 30,
        borderLeftWidth: 150,
        borderRightWidth: 150,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "grey",
        justifyContent: "center",
    },
    leftArrow: {
        borderTopWidth: 150,
        borderBottomWidth: 150,
        borderRightWidth: 30,
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        borderRightColor: "grey",
        justifyContent: "center",
    },
});
