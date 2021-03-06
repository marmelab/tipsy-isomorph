import React from "react";
import PlayerInputName from "../../../../lib/shared/PlayerNameInput.jsx";
import { joinGame } from "../../../../lib/game/GameApi.js";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const Join = ({ gameId }) => {
    const router = useRouter();
    const join = async (playerName) => {
        const [, playerId] = await joinGame(playerName, gameId);
        router.push(`/tipsy/game?id=${gameId}&playerId=${playerId}`);
    };

    return (
        <PlayerInputName
            onPress={join}
            onPressFallBack={`/tipsy/game/${gameId}/join`}
        ></PlayerInputName>
    );
};
export async function getServerSideProps({ query, res }) {
    const { gameId, playerName } = query;
    if (playerName) {
        const [, playerId] = await joinGame(playerName, gameId);
        res.setHeader(
            "Location",
            `/tipsy/game?id=${gameId}&playerId=${playerId}`
        );
        res.statusCode = 302;
        return { props: {} };
    }

    return { props: { gameId } };
}

Join.propTypes = {
    gameId: PropTypes.number,
};

export default Join;
