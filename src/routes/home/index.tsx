import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as style from "./style.css";

import SpotUI from "../../components/spot";
import Game from "../../core/grid";

const game_size = 25;

const Home: FunctionalComponent = () => {
    const [game, setGame] = useState(new Game(game_size));
    const [move, setMove] = useState(false);

    function handleMouseDown() {
        setMove(true);
    }

    function handleMouseUp() {
        setMove(false);
    }

    function handleMouseMove(e: any) {
        if (move) {
            // console.log(e);
            e.target.dispatchEvent(new CustomEvent("mouse_moved"));
        }
    }

    return (
        <div
            class={style.home}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <h4>Select a start and end and some barriers</h4>
            <button
                onClick={() => {
                    // console.log("Reset clicked");
                    setGame(new Game(game_size));
                }}
            >
                Reset Me
            </button>
            <button
                onClick={() => {
                    // console.log("Start Game clicked");
                    const gameSteps = game.startGame();
                    const interval = setInterval(() => {
                        const step = gameSteps.next();
                        if (step.done) {
                            clearInterval(interval);
                        }
                    }, 10);
                }}
            >
                Start Exploring
            </button>
            <br />
            <br />
            <div class={style.container}>
                {game.grid.map(row => {
                    return row.map(spot => {
                        return (
                            <div key={spot}>
                                <SpotUI spot={spot} game={game} />
                            </div>
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default Home;
