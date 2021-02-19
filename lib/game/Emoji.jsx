import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native-web";

//Almost copy paste from : https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7
const Emoji = ({ symbol, label }) => {
    return (
        <span
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
        >
            <Text style={{ fontSize: 40 }}>{symbol}</Text>
        </span>
    );
};

Emoji.propTypes = {
    symbol: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default Emoji;
