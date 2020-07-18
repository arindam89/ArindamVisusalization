import * as Color from "./colors";
const color_array = Object.keys(Color);

class Spot {
    i: number;
    j: number;
    color: string;
    constructor(i: number, j: number) {
        this.i = i;
        this.j = j;
        this.color = Color.WHITE;
    }

    getRandomColor() {
        const randomKey =
            color_array[Math.floor(Math.random() * color_array.length)];
        return Color[randomKey];
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
        return this.color === Color.RED;
    }

    markClosed() {
        this.color = Color.GREY;
    }

    isClosed(): boolean {
        return this.color === Color.GREY;
    }

    markOpen() {
        this.color = Color.WHITE;
    }

    isOpen() {
        return this.color === Color.WHITE;
    }
}

export default Spot;
