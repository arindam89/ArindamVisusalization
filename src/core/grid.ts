import Spot from "./spot";

class Grid {
    size: number;
    grid: Array<Array<Spot>>;
    constructor(size: number) {
        this.size = size;
        this.grid = [];
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
}

export default Grid;
