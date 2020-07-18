import Spot from "./spot";
import { startSolver } from "./search";

class Game {
    size: number;
    grid: Array<Array<Spot>>;
    start?: Spot;
    end?: Spot;
    running: boolean;
    constructor(size: number) {
        this.size = size;
        this.running = false;
        this.grid = [];
        this.steps = 0;
        for (let i = 0; i < size; i++) {
            if (!this.grid[i]) this.grid[i] = [];
            for (let j = 0; j < size; j++) {
                this.grid[i].push(new Spot(i, j));
            }
        }
    }

    getSpot(row: number, col: number): Spot | null {
        if (row < this.grid.length && col < this.grid[0].length) {
            return this.grid[row][col];
        } else return null;
    }

    setStart(spot: Spot) {
        this.start = spot;
    }

    getStart() {
        return this.start;
    }

    hasStart() {
        return this.start !== undefined;
    }

    resetStart() {
        this.start = undefined;
    }

    setEnd(spot: Spot) {
        this.end = spot;
    }

    getEnd() {
        return this.end;
    }

    hasEnd() {
        return this.end !== undefined;
    }

    resetEnd() {
        this.end = undefined;
    }

    startGame() {
        console.log(`Game is starting`);
        this.running = true;
        return startSolver(this);
    }

    isRunning() {
        return this.running;
    }

    stopGame() {
        this.running = false;
    }
}

export default Game;
