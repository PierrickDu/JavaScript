import GraphObj from "./GraphObj.js";

export default class Xp extends GraphObj {

    constructor(x, y, l, h) {
        super(x, y, l, h, 'yellow'); 
        this.speed = 2;
    }  

    move(playerPos) {
        if(playerPos.x<this.x){
            this.x -= this.speed;
        }
        if(playerPos.x>this.x){
            this.x += this.speed;
        }
        if(playerPos.y<this.y){
            this.y -= this.speed;
        }
        if(playerPos.y>this.y){
            this.y += this.speed;
        }        
    }    
}