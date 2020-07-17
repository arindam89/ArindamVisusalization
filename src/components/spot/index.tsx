import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const SPOT_WIDTH = 30;

const Header: FunctionalComponent = props => {
    const top = props.i * SPOT_WIDTH;
    const left = props.j * SPOT_WIDTH;
    return (
        <div
            class={style.spot}
            style={{ left, top, backgroundColor: props.color }}
        >
            [{props.i}, {props.j}]
        </div>
    );
};

export default Header;
