import Spot from "./spot";
import Game from "./grid";
import TinyQueue from "./pqueue";

class SetItem {
    spot: Spot;
    f_score: number;
    count: number;
    constructor(f_score: number, count: number, spot: Spot) {
        this.f_score = f_score;
        this.count = count;
        this.spot = spot;
    }
}

function h_distance(spot1: Spot, spot2: Spot) {
    const x1 = spot1.i;
    const y1 = spot1.j;
    const x2 = spot2.i;
    const y2 = spot2.j;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function compareItemWeight(item1: SetItem, item2: SetItem) {
    if (item1.f_score < item2.f_score) {
        return -1;
    }

    if (item1.f_score > item2.f_score) {
        return 1;
    }

    // Tie Breaker
    if (item1.count < item2.count) {
        return -1;
    }

    return 1;
}

export function* startSolver(game: Game) {
    const start = game.getStart();
    const end = game.getEnd();
    const size = game.size;
    const grid = game.grid;
    const g_score: any = [];
    const f_score: any = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!g_score[i]) g_score[i] = [];
            if (!f_score[i]) f_score[i] = [];
            grid[i][j].updateNeighbors(grid, size);
            g_score[i][j] = Number.MAX_SAFE_INTEGER;
            f_score[i][j] = Number.MAX_SAFE_INTEGER;
        }
    }
    //@ts-ignore
    g_score[start.i][start.j] = 0;
    //@ts-ignore
    f_score[start.i][start.j] = h_distance(start!!, end!!);

    // console.log(g_score);
    // console.log(f_score);
    // console.log(grid);

    // Main Algorithm
    let count = 0;
    const parent = new Map();
    const open_set = new TinyQueue([], compareItemWeight);
    const startSet = new SetItem(0, count, start!!);
    open_set.push(startSet);
    const open_spots = new Map();
    open_spots.set(startSet.spot, true);

    while (!open_set.empty()) {
        // console.log("Peeking:", open_set.peek());
        const current = open_set.pop();
        open_spots.delete(current.spot);

        if (current.spot.isEndSpot()) {
            // Done
            // console.log("Done found it", parent);
            processPath(parent, start!!, end!!);
            return true;
        }
        current.spot.neighbours.forEach((n: Spot) => {
            const temp_g_score = g_score[current.spot.i][current.spot.j] + 1;
            if (temp_g_score < g_score[n.i][n.j]) {
                g_score[n.i][n.j] = temp_g_score;
                f_score[n.i][n.j] = temp_g_score + h_distance(n, end!!);
                parent.set(n, current.spot);
                // console.log("Parent of is", n, current.spot);
                if (!open_spots.get(n)) {
                    count++;
                    open_spots.set(n, true);
                    open_set.push(new SetItem(f_score[n.i][n.j], count, n));
                    if (!n.isEndSpot()) n.markOpenToVisit();
                    //window.dispatchEvent(new CustomEvent('draw_game'))
                }
            }
        });

        if (!current.spot.isStartSpot() && !current.spot.isEndSpot()) {
            current.spot.markVisited();
            yield count;
        }
    }
}

function processPath(chain: any, start: Spot, end: Spot) {
    let spot = end;
    while (spot !== start) {
        spot = chain.get(spot);
        if (!spot.isStartSpot()) spot.makePathSpot();
        // console.log("Path: ", spot.i, spot.j);
    }
}
