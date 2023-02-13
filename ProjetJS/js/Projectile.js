import GraphObj from "./GraphObj.js";

export default class Projectile extends GraphObj {

    constructor(x, y, l, h) {
        super(x, y, l, h, 'blue'); 
        this.t = -20;
        this.speed = 2;
        this.cooldown = 12;
        this.vx=0;
        this.vy=0;
        this.ratio=0
    }  
    
    trajectory(player, mousePos) {  
        this.ratio = Math.abs(player.x-mousePos.x)/Math.abs(player.y-mousePos.y);  
        if(this.ration<0){
            this.vx = this.ration;
            this.vy = 1;
        }
        else{
            this.vx = 1;
            this.vy = this.ratio;
        }        
                      
    }  
    
    move(){
        this.x += this.vx;
        this.y += this.vy;
    }

}