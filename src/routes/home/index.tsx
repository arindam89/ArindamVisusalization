import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as style from "./style.css";

import SpotUI from "../../components/spot";
import Game from "../../core/grid";

const game_size = 25;

const Home: FunctionalComponent = () => {
    const [game, setGame] = useState(new Game(game_size));
    const [move, setMove] = useState(false);

    function handleMouseDown(e: any) {
        console.log("handleMouseDown", e);
        //e.preventDefault();
        setMove(true);
    }

    function handleMouseUp(e: any) {
        console.log("handleMouseUp", e);
        setMove(false);
    }

    function handleMouseMove(e: any) {
        if (move) {
            console.log("handleMouseMove", e);
            e.target.dispatchEvent(new CustomEvent("mouse_moved"));
        }
    }

    function handleTouchMove(e: any) {
        if (move) {
            console.log("handleTouchMove", e);
            const loc = e.touches[0];
            // @ts-ignore
            const el = document.elementFromPoint(loc.clientX, loc.clientY);
            // @ts-ignore
            el.dispatchEvent(new CustomEvent("mouse_moved"));
        }
    }

    return (
        <div
            class={style.home}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
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
