import * as Color from "./colors";
const color_array = Object.keys(Color);

class Spot {
    i: number;
    j: number;
    color: string;
    neighbours: Spot[];
    constructor(i: number, j: number) {
        this.i = i;
        this.j = j;
        this.color = Color.WHITE;
        this.neighbours = [];
    }

    getRandomColor() {
        const randomKey =
            color_array[Math.floor(Math.random() * color_array.length)];
        return Color[randomKey];
    }

    makePathSpot() {
        this.color = Color.BLACK;
    }

    makeStartSpot() {
        this.color = Color.GREEN;
    }

    isStartSpot(): boolean {
        return this.color === Color.GREEN;
    }

    makeEndSpot() {
        this.color = Color.RED;
    }

    isEndSpot(): boolean {
        console.log("isEndSpot:", this.color);
        return this.color === Color.RED;
    }

    markClosed() {
        this.color = Color.GREY;
    }

    isClosed(): boolean {
        return this.color === Color.GREY;
    }

    markVisited() {
        this.color = Color.YELLOW;
    }

    isVisited(): boolean {
        return this.color === Color.YELLOW;
    }

    markOpenToVisit() {
        this.color = Color.BLUE;
    }

    isOpenToVisit(): boolean {
        return this.color === Color.BLUE;
    }

    markOpen() {
        this.color = Color.WHITE;
    }

    isOpen() {
        return this.color === Color.WHITE;
    }

    updateNeighbors(grid: Array<Array<Spot>>, size: number) {
        // UP
        if (this.i - 1 >= 0 && !grid[this.i - 1][this.j].isClosed()) {
            this.neighbours.push(grid[this.i - 1][this.j]);
        }

        // DOWN
        if (this.i + 1 < size && !grid[this.i + 1][this.j].isClosed()) {
            this.neighbours.push(grid[this.i + 1][this.j]);
        }

        // LEFT
        if (this.j - 1 >= 0 && !grid[this.i][this.j - 1].isClosed()) {
            this.neighbours.push(grid[this.i][this.j - 1]);
        }

        // RIGHT
        if (this.j + 1 < size && !grid[this.i][this.j + 1].isClosed()) {
            this.neighbours.push(grid[this.i][this.j + 1]);
        }
    }
}

export default Spot;
