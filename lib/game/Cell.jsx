import React from "react";
import { View, StyleSheet } from "react-native-web";
import Puck from "./Puck.jsx";
import PropTypes from "prop-types";
const Cell = ({ game, x, y, cellType }) => {
    return (
        <View key={"cell" + x + y} style={styles[cellType]}>
            <Puck x={x} y={y} pucks={game.pucks}></Puck>
        </View>
    );
};

Cell.propTypes = {
    game: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    cellType: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
    cell: {
        width: 36,
        height: 36,
        alignItems: "center",
        alignContent: "center",
    },
    left: {
        width: 36,
        height: 36,
        borderLeftWidth: 2,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    topleft: {
        width: 36,
        height: 36,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    topright: {
        width: 36,
        height: 36,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    right: {
        width: 36,
        height: 36,
        borderRightWidth: 2,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    bottom: {
        width: 36,
        height: 36,
        borderBottomWidth: 2,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    bottomright: {
        width: 36,
        height: 36,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    bottomleft: {
        width: 36,
        height: 36,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    top: {
        width: 36,
        height: 36,
        borderTopWidth: 2,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    exit: {
        width: 36,
        height: 36,
        borderWidth: 0,
        borderColor: "grey",
        alignItems: "center",
        alignContent: "center",
    },
    obstacle: {
        width: 36,
        height: 36,
        backgroundColor: "grey",
    },
});
export default Cell;
