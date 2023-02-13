import GraphObj from "./GraphObj.js";

export default class Target extends GraphObj {


    constructor() {
        super(50, 50, 50, 50, 'black'); 
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;     
        this.hp = 200;
        this.xp = 0;   
        this.lv = 1;
    }    

    followMouse(mousePos) {
        this.x = mousePos.x - this.l / 2;
        this.y = mousePos.y - this.h / 2;
    }
}