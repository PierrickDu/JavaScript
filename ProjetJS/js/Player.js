import GraphObj from "./GraphObj.js";

export default class Player extends GraphObj {

    static hp = 200;
    static hpMax = 200;
    static xp = 0;
    static xpMax = 100;
    static lv =1;

    constructor() {
        super(50, 50, 50, 50, 'black'); 
        this.vx = 0;
        this.vy = 0;
        this.speed = 5; 
    }    

    move() {    
        this.x += this.vx;
        this.y += this.vy;               
    }

    testeCollisionAvecBordsDuCanvas(largeurCanvas, hauteurCanvas) {
        if (this.x + this.l > largeurCanvas) {            
            this.x = largeurCanvas - this.l;            
        }
        if (this.x < 0) {            
            this.x = 0;            
        }
        if (this.y + this.h > largeurCanvas) {            
            this.y = largeurCanvas - this.h;            
        }
        if (this.y < 0) {            
            this.y = 0;            
        }
    }
}