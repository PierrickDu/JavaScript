export default class GraphObj {
    constructor(x, y, l, h, color) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.h = h;
        this.color = color;
    }   

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.l, this.h);
        ctx.restore();
    }

    drawBoundingBox(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(0, 0, this.l, this.h);
        ctx.restore();
    }
}