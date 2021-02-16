
export function createCanvas(w: number, h: number) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    return canvas
}

// setPixel(x: number, y: number, color: string) {
//     const [r, g, b, a] = [
//         parseInt(color.substr(0, 2), 16),
//         parseInt(color.substr(2, 2), 16),
//         parseInt(color.substr(4, 2), 16),
//         parseInt(color.substr(6, 2), 16),
//     ]
//     const i = y * this.canvas.width * 4 + x * 4;
//     const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
//     img.data[i + 0] = r;
//     img.data[i + 1] = g;
//     img.data[i + 2] = b;
//     img.data[i + 3] = a;
//     this.ctx.putImageData(img, 0, 0);
// }

export function Zoom() {
    const scales = [1, 2, 4, 8, 16, 32];
    let range = 3 / scales.length;
    this.update = (e: WheelEvent) => {
        range += e.deltaY > 0 ? -0.1 : 0.1;
        range = Math.min(Math.max(range, 0), 1);
    }
    this.scale = () => scales[Math.round(range * (scales.length - 1))];
}
