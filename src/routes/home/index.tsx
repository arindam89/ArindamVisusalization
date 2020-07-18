import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as style from "./style.css";

import SpotUI from "../../components/spot";
import Grid from "../../core/grid";

const game_size = 10;
const main_game = new Grid(game_size);

const Home: FunctionalComponent = () => {
    const [game, setGame] = useState(main_game);
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <button
                onClick={() => {
                    console.log("Reset clicked");
                }}
            >
                Reset Me
            </button>
            <br />
            <br />
            <div class={style.container}>
                {game.grid.map(row => {
                    return row.map(spot => {
                        return <SpotUI spot={spot} />;
                    });
                })}
            </div>
        </div>
    );
};

export default Home;
