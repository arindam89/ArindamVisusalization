import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as style from "./style.css";

import SpotUI from "../../components/spot";
import Grid from "../../core/grid";

const game_size = 20;

const Home: FunctionalComponent = () => {
    const [game, setGame] = useState(new Grid(game_size));
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <button
                onClick={() => {
                    setGame(new Grid(game_size));
                }}
            >
                Reset Me
            </button>
            <br />
            <br />
            <div class={style.container}>
                {game.grid.map(row => {
                    return row.map(spot => {
                        return (
                            <SpotUI i={spot.i} j={spot.j} color={spot.color} />
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default Home;
