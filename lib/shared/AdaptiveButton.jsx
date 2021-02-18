import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native-web";
import PropTypes from "prop-types";
import { globalStyle } from "../shared/style";

const AdaptiveButton = ({ onPress, href, style, children }) => {
    const [jsOnlyStyle, setJsOnlyStyle] = useState({ display: "none" });

    useEffect(() => {
        if (jsOnlyStyle.display) {
            setJsOnlyStyle({});
        }
    }, [jsOnlyStyle, setJsOnlyStyle]);
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={globalStyle[style]}>
                <noscript>
                    <a href={href}>{children}</a>
                </noscript>
                <View style={jsOnlyStyle}>{children}</View>
            </View>
        </TouchableOpacity>
    );
};

AdaptiveButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    href: PropTypes.string.isRequired,
    style: PropTypes.string,
    children: PropTypes.node.isRequired,
};
export default AdaptiveButton;
