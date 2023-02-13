import GraphObj from "./GraphObj.js";

export default class Strike extends GraphObj {

    constructor(x, y, l, h) {
        super(x, y, l, h, 'blue'); 
        this.t = -20;
        this.speed = 2;
        this.cooldown = 12;
    }  
    
    hit(player){
        if(this.t<=20){
            this.t+=this.speed;
            this.x = Math.sqrt(4-this.t/10*this.t/10)*50+player.x;
            this.y = this.t*5+player.y;
        }
        else{            
            this.t=-20;
        }  
    }   
}