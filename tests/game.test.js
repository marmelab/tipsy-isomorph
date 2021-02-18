import React from "react";
import { render, screen } from "@testing-library/react";
import notFullGame from "./NotFullGame.json";

import Game from "../pages/tipsy/game.jsx";

describe("Game", () => {
    test("renders App component", () => {
        render(
            <Game
                currentGame={notFullGame}
                playerId={notFullGame.currentPlayer}
            />
        );
        screen.debug();
    });
});
