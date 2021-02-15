import { View, StyleSheet } from "react-native-web";
import React from "react";
import PropTypes from "prop-types";

const Puck = ({ x, y, pucks }) => {
    const foundPuck = pucks.find(
        (puck) => puck.position.x === x && puck.position.y === y
    );
    const getColorStyle = (color) => {
        switch (color) {
            case "black":
                return styles.black;
            case "blue":
                return styles.blue;
            case "red":
                return styles.red;
        }
    };
    if (foundPuck) {
        return (
            <View
                style={[
                    styles.puck,
                    foundPuck.flipped ? styles.flipped : null,
                    getColorStyle(foundPuck.color),
                ]}
            ></View>
        );
    }
    return null;
};

Puck.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    pucks: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({
    puck: {
        width: 32,
        height: 32,
        borderRadius: 50,
    },
    flipped: {
        borderWidth: 5,
        borderColor: "grey",
    },
    red: {
        backgroundColor: "lightsalmon",
    },
    blue: {
        backgroundColor: "steelblue",
    },
    black: {
        backgroundColor: "black",
    },
});

export default Puck;
