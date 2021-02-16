import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native-web";
import PropTypes from "prop-types";

const AdaptiveButton = ({ action, noJsFallBack, style, children }) => {
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
                    <a href={noJsFallBack}>{children}</a>
                </noscript>
                <View style={jsOnlyStyle}>{children}</View>
            </View>
        </TouchableOpacity>
    );
};

AdaptiveButton.propTypes = {
    action: PropTypes.func.isRequired,
    noJsFallBack: PropTypes.string.isRequired,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
};
export default AdaptiveButton;
