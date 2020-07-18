import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as style from "./style.css";

import SpotUI from "../../components/spot";
import Game from "../../core/grid";

const game_size = 10;

const Home: FunctionalComponent = () => {
    const [game, setGame] = useState(new Game(game_size));
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <button
                onClick={() => {
                    console.log("Reset clicked");
                    setGame(new Game(game_size));
                }}
            >
                Reset Me
            </button>
            <button
                onClick={() => {
                    console.log("Start Game clicked");
                    game.startGame();
                }}
            >
                Start Exploring
            </button>
            <br />
            <br />
            <div class={style.container}>
                {game.grid.map(row => {
                    return row.map(spot => {
                        return <SpotUI spot={spot} game={game} />;
                    });
                })}
            </div>
        </div>
    );
};

export default Home;
