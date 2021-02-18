import { StyleSheet } from "react-native-web";

export const globalStyle = StyleSheet.create({
    upArrow: {
        marginBottom: 30,
        borderBottomWidth: 30,
        borderLeftWidth: 150,
        borderRightWidth: 150,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "grey",
        justifyContent: "center",
    },
    rightArrow: {
        marginLeft: 10,
        borderTopWidth: 150,
        borderBottomWidth: 150,
        borderLeftWidth: 30,
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        borderLeftColor: "grey",
        justifyContent: "center",
    },
    downArrow: {
        marginTop: 30,
        borderTopWidth: 30,
        borderLeftWidth: 150,
        borderRightWidth: 150,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "grey",
        justifyContent: "center",
    },
    leftArrow: {
        marginRight: 10,
        borderTopWidth: 150,
        borderBottomWidth: 150,
        borderRightWidth: 30,
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        borderRightColor: "grey",
        justifyContent: "center",
    },
});
