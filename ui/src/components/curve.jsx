import { Bezier } from "bezier-js";

export default function Curve(props) {
    const start = props.server;
    const end = props.peer;

    let divisor = 1.6;

    const mid = [(start[0]+end[0])/divisor, (start[1]+end[1])/divisor];

    const b = new Bezier({x:start[0], y:start[1]}, {x:mid[0], y:mid[1]}, {x: end[0], y: end[1]});
    return b.getLUT(100).map(o => (
        [o.x, o.y]
    ));
}
