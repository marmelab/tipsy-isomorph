import CONSTANTS from "../const";
import { v4 as uuidv4 } from "uuid";

const tilt = (direction, playerId, gameId) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerId, direction }),
    };
    return fetch(
        `${CONSTANTS.BASE_URL}/game/${gameId}/tilt`,
        requestOptions
    ).then(async (res) => {
        if (!res.ok) {
            return Promise.reject(
                new Error(`error on requesting /game/${gameId}/tilt`)
            );
        }
        return await res.json();
    });
};
const replace = (gameId) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(
        `${CONSTANTS.BASE_URL}/game/${gameId}/replace`,
        requestOptions
    ).then(async (res) => {
        if (!res.ok) {
            return Promise.reject(
                new Error(`error on requesting /game/${gameId}/replace`)
            );
        }
        return await res.json();
    });
};
const pendingGames = () => {
    return fetch(`${CONSTANTS.BASE_URL}/game/pending`).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
            const error = (data && data.message) || res.status;
            return Promise.reject(new Error(error));
        }
        return data;
    });
};
const newGame = async (playerName, quickGame) => {
    if (quickGame) {
        const games = await pendingGames();
        if (games.length > 0) {
            return joinGame(playerName, games[0].id);
        }
    }
    const playerId = uuidv4();
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerName, playerId, quickGame: quickGame }),
    };

    return fetch(`${CONSTANTS.BASE_URL}/game`, requestOptions).then(
        async (res) => {
            const data = await res.json();
            if (!res.ok) {
                const error = (data && data.message) || res.status;
                return Promise.reject(error);
            }
            return [data, playerId];
        }
    );
};
const joinGame = (playerName, gameId) => {
    const playerId = uuidv4();
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerName, playerId }),
    };
    return fetch(
        `${CONSTANTS.BASE_URL}/game/${gameId}/join`,
        requestOptions
    ).then(async (res) => {
        if (!res.ok) {
            return Promise.reject("une erreur!");
        }
        return await [await res.json(), playerId];
    });
};
const getGame = (gameId) => {
    return fetch(`${CONSTANTS.BASE_URL}/game/${gameId}`).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
        }
        return data;
    });
};

export default { getGame, pendingGames, newGame, joinGame, tilt, replace };
