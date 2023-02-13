import GraphObj from "./GraphObj.js";

export default class Strike extends GraphObj {

    constructor() {
        super(120, 120, 100, 20, 'blue'); 
        this.t = -20;
        this.speed = 0.5;
        this.cooldown = 12;
    }  

    hit(player, inputState){
        if(inputState.left+inputState.right>0){
            this.l=100
            this.h=20
            this.x = player.x+player.l;
            this.y = player.y+player.h/2-this.h/2; 
        }else if (inputState.left+inputState.right<0){  
            this.l=100
            this.h=20          
            this.x = player.x-this.l;
            this.y = player.y+player.h/2-this.h/2; 
        }else if (inputState.up+inputState.down>0){ 
            this.l=20
            this.h=100         
            this.y = player.y+player.h;
            this.x = player.x+player.l/2-this.l/2; 
        }else if (inputState.up+inputState.down<0){  
            this.l=20
            this.h=100         
            this.y = player.y-this.h;
            this.x = player.x+player.l/2-this.l/2; 
        } 
    }  
}