import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as style from "./style.css";

import SpotUI from "../../components/spot";
import Game from "../../core/grid";

const SPOT_WIDTH = 10;

const Home: FunctionalComponent = () => {
    const [move, setMove] = useState(false);
    const [grid_size, setGridSize] = useState(20);
    const [game, setGame] = useState(new Game(grid_size));

    function handleMouseDown(e: any) {
        // console.log("handleMouseDown", e);
        //e.preventDefault();
        setMove(true);
    }

    function handleMouseUp(e: any) {
        // console.log("handleMouseUp", e);
        setMove(false);
    }

    function handleMouseMove(e: any) {
        if (move) {
            // console.log("handleMouseMove", e);
            e.target.dispatchEvent(new CustomEvent("mouse_moved"));
        }
    }

    function handleTouchMove(e: any) {
        if (move) {
            // console.log("handleTouchMove", e);
            const loc = e.touches[0];
            // @ts-ignore
            const el = document.elementFromPoint(loc.clientX, loc.clientY);
            // @ts-ignore
            el.dispatchEvent(new CustomEvent("mouse_moved"));
        }
    }

    function handleSizeChange(e) {
        //console.log(e.target.value);
        setGridSize(e.target.value);
        setGame(new Game(e.target.value));
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
            <h4>Select a Grid Size: {grid_size}</h4>
            <div class="slidecontainer">
                <input
                    type="range"
                    min="2"
                    max="50"
                    defaultValue={grid_size}
                    class="slider"
                    id="myRange"
                    onChange={handleSizeChange}
                />
            </div>
            <br />
            <br />
            <div class={style.actions}>
                <button
                    onClick={() => {
                        // console.log("Reset clicked");
                        setGame(new Game(grid_size));
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
            </div>

            <br />
            <br />
            <div
                class={style.container}
                style={{
                    width: grid_size * SPOT_WIDTH,
                    height: grid_size * SPOT_WIDTH
                }}
            >
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
