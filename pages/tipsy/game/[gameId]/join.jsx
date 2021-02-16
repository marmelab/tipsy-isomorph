import React from "react";
import PlayerInputName from "../../../../lib/shared/PlayerNameInput.jsx";
import gameApi from "../../../../lib/game/GameApi.js";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const Join = ({ gameId }) => {
    const router = useRouter();
    const joinGame = async (playerName) => {
        await gameApi.joinGame(playerName, gameId);
        router.push(`/tipsy/game?id=${gameId}&playerName=${playerName}`);
    };

    return <PlayerInputName onPress={joinGame}></PlayerInputName>;
};
export async function getServerSideProps({ query }) {
    const { gameId } = query;

    return { props: { gameId } };
}

Join.propTypes = {
    gameId: PropTypes.number,
};

export default Join;
