import { FunctionalComponent, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { Link } from "preact-router/match";
import Spot from "../../core/spot";
import * as style from "./style.css";
import Game from "../../core/grid";

const SPOT_WIDTH = 10;

export interface Props {
    spot: Spot;
    game: Game;
}

const SpotUI: FunctionalComponent<Props> = (props: Props) => {
    const top = props.spot.i * SPOT_WIDTH;
    const left = props.spot.j * SPOT_WIDTH;
    const spot = props.spot;
    const game = props.game;
    const [color, setColor] = useState(props.spot.color);
    const [drag, setDrag] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        setColor(props.spot.color);
    }, [props.spot]);

    // This is what makes rendering of the same spot with different color possible.
    useEffect(() => {
        const r = setInterval(() => {
            setColor(props.spot.color);
        }, 10);
        return () => {
            clearInterval(r);
        };
    }, []);

    function handleSpotClick(e: any) {
        if (!game.isRunning()) {
            if (spot.isOpen()) {
                if (!game.hasStart()) {
                    spot.makeStartSpot();
                    game.setStart(spot);
                } else if (!game.hasEnd()) {
                    spot.makeEndSpot();
                    game.setEnd(spot);
                } else {
                    spot.markClosed();
                }
            } else if (spot.isClosed()) {
                //spot.markOpen();
            }
            setColor(spot.color);
        }
    }

    useEffect(() => {
        // @ts-ignore
        const listen = ref.current.addEventListener(
            "mouse_moved",
            handleSpotClick
        );
        return () => {
            // @ts-ignore
            ref.current.removeEventListener("mouse_moved", handleSpotClick);
        };
    }, []);

    return (
        <div
            class={style.spot}
            style={{ left, top, backgroundColor: color }}
            onClick={handleSpotClick}
            ref={ref}
        >
            {/*[{props.spot.i}, {props.spot.j}]*/}
        </div>
    );
};

export default SpotUI;
