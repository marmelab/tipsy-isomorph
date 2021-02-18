import { StyleSheet, Animated } from "react-native-web";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Puck = ({ puck }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
        }).start();
    });
    useEffect(() => {
        return () => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
            }).start();
        };
    });

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

    const absolutePosition = (position) => {
        return {
            position: "absolute",
            left: (position.x + 1) * 35 - 6,
            top: position.y * 35 + 5,
        };
    };
    return (
        <Animated.View
            style={[
                styles.puck,
                puck.flipped ? styles.flipped : null,
                getColorStyle(puck.color),
                { opacity: fadeAnim },
                absolutePosition(puck.position),
            ]}
        ></Animated.View>
    );
};

Puck.propTypes = {
    puck: PropTypes.object.isRequired,
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
