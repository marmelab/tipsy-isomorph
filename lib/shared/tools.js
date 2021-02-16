const isGameFull = (game) => {
    if (!game) {
        return false;
    }
    for (const player of game.players) {
        if (!player.name) {
            return false;
        }
    }
    return true;
};

export default isGameFull;
