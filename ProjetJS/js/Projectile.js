import GraphObj from "./GraphObj.js";

export default class Projectile extends GraphObj {

    static speed = 10;
    static cooldown = 12;

    constructor(player, mousePos) {
        super(player.x+player.l/2, player.y+player.h/2, 10, 10, 'blue');
        this.ratio=Math.abs(mousePos.x-player.x)+Math.abs(mousePos.y-player.y);
        this.vx = ((mousePos.x-player.x)/this.ratio);
        this.vy = ((mousePos.y-player.y)/this.ratio);     
    }  
    
    move(){
        this.x += this.vx*Projectile.speed;
        this.y += this.vy*Projectile.speed;
    }

    testeCollisionAvecBordsDuCanvas(largeurCanvas, hauteurCanvas) {
        if (this.x + this.l > largeurCanvas) {            
            return true;         
        }
        if (this.x < 0) {            
            return true; ;            
        }
        if (this.y + this.h > largeurCanvas) {            
            return true;             
        }
        if (this.y < 0) {            
            return true;             
        }
        return false; 
    }

}