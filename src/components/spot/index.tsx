import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";
import Spot from "../../core/spot";
import * as style from "./style.css";
import Game from "../../core/grid";

const SPOT_WIDTH = 30;

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

    useEffect(() => {
        setColor(props.spot.color);
    }, [props.spot]);

    function handleSpotClick(e) {
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
                spot.markOpen();
            }
            setColor(spot.color);
        }
    }

    return (
        <div
            class={style.spot}
            style={{ left, top, backgroundColor: color }}
            onClick={handleSpotClick}
        >
            [{props.spot.i}, {props.spot.j}]
        </div>
    );
};

export default SpotUI;
