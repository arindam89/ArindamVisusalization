import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { Link } from "preact-router/match";
import Spot from "../../core/spot";
import * as style from "./style.css";

const SPOT_WIDTH = 30;

export interface Props {
    spot: Spot;
}

const Header: FunctionalComponent<Props> = (props: Props) => {
    console.log(props.spot);
    const top = props.spot.i * SPOT_WIDTH;
    const left = props.spot.j * SPOT_WIDTH;
    const spot = props.spot;
    const [color, setColor] = useState(props.spot.color);

    function handleSpotClick(e) {
        if (spot.isOpen()) {
            spot.markClosed();
        } else if (spot.isClosed()) {
            spot.markOpen();
        }

        setColor(spot.color);
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

export default Header;
