import CONSTANTS from "../../../const";

const gameApi = {
    tilt: (direction, playerName, gameId) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName, direction }),
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
    },
    replace: (gameId) => {
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
    },
    newGame: (playerName, withBot) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName, withBot: withBot }),
        };
        return fetch(`${CONSTANTS.BASE_URL}/game`, requestOptions).then(
            async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                return data;
            }
        );
    },
    pendingGames: () => {
        return fetch(`${CONSTANTS.BASE_URL}/game/pending`).then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                const error = (data && data.message) || res.status;
                return Promise.reject(new Error(error));
            }
            return data;
        });
    },
    joinGame: (playerName, gameId) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName }),
        };
        return fetch(
            `${CONSTANTS.BASE_URL}/game/${gameId}/join`,
            requestOptions
        ).then(async (res) => {
            if (!res.ok) {
                return Promise.reject("une erreur!");
            }
            return await res.json();
        });
    },
    getGame: (gameId) => {
        return fetch(`${CONSTANTS.BASE_URL}/game/${gameId}`).then(
            async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    const error = (data && data.message) || res.status;
                    return Promise.reject(error);
                }
                return data;
            }
        );
    },
};

export default gameApi;
