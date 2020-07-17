import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const SPOT_WIDTH = 30;

export interface Props {
    i: number;
    j: number;
    color: string;
}

const Header: FunctionalComponent<Props> = (props: Props) => {
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
