import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native-web";
import PropTypes from "prop-types";

const AdaptiveButton = ({ action, noJsFallBack, text, style }) => {
    const [jsOnlyStyle, setJsOnlyStyle] = useState({ display: "none" });

    useEffect(() => {
        if (jsOnlyStyle.display) {
            setJsOnlyStyle({});
        }
    }, [jsOnlyStyle, setJsOnlyStyle]);
    return (
        <TouchableOpacity onPress={() => action()}>
            <View style={style}>
                <noscript>
                    <a href={noJsFallBack}>{text}</a>
                </noscript>
                <Text style={jsOnlyStyle}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

AdaptiveButton.propTypes = {
    action: PropTypes.func.isRequired,
    noJsFallBack: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
export default AdaptiveButton;
