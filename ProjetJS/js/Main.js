import FrontStrike from './FrontStrike.js';
import Strike from './Strike.js';
import Enemy from './Enemy.js';
import GraphObj from './GraphObj.js';
import { circRectsOverlap, rectsOverlap } from './Collisions.js';
import { addMouseListener, addKeyboardListener, inputState, mousePos } from './Listener.js';
import Player from './Player.js';
import Xp from './Xp.js';
import Target from'./Target.js';
import Projectile from './Projectile.js';

let canvas, ctx;
let gameState = 'jeuEnCours';
let GraphObjects = [];
let ATH = [];
let player;
let randomPos = {x: 0, y: 0};
let lifeBar;
let xpBar;


let frontStrike;
let target;
let projectile;

window.onload = init;

function init(event) {    
    canvas = document.querySelector('#myCanvas');    
    ctx = canvas.getContext('2d');  
    canvas.width = window.innerWidth-1;
    canvas.height = window.innerHeight-1;    
    startGame();    
}

function startGame() {    
    addKeyboardListener();
    addMouseListener();
    player = new Player();
    frontStrike = new FrontStrike()
    GraphObjects.push(player);
    for(let i = 0; i<10; i++){
        getRandomSpawn();
        GraphObjects.push(new Enemy(randomPos.x, randomPos.y, 50, 50));        
    }    
    lifeBar = new GraphObj(5, 5, 205, 10, 'red');
    xpBar = new GraphObj(5, 20, 0, 10, 'yellow');    
    target = new Target(20, 20, 20, 20);    
    ATH.push(new GraphObj(0, 0, 210, 5));
    ATH.push(new GraphObj(0, 15, 210, 5));
    ATH.push(new GraphObj(0, 0, 5, 15));
    ATH.push(new GraphObj(210, 0, 5, 20));    
    ATH.push(new GraphObj(0, 30, 210, 5));
    ATH.push(new GraphObj(0, 15, 5, 15));
    ATH.push(new GraphObj(210, 15, 5, 20));
    ATH.push(xpBar);
    ATH.push(lifeBar);    
    ATH.push(target);
    requestAnimationFrame(animationLoop);
}

function animationLoop() {        
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'ecranDebutNiveau':
            afficheEcranDebutNiveau(ctx);
            break;
        case 'jeuEnCours': 
            GraphObjects.forEach(o => {                
                o.draw(ctx);
            }); 
            ATH.forEach(o => {                
                o.draw(ctx);
            });           
            GraphObjects.forEach (o => {
                if(o instanceof Enemy){
                    o.move(player);
                }    
                else if (o instanceof Projectile){
                    o.move();
                }            
            }) ;            
            GraphObjects.push(frontStrike);
            frontStrike.hit(player, inputState);
            target.followMouse(mousePos);
            testeEtatClavierPourJoueur();         
            player.move();             
            if (player.hp<=0){
                gameState = 'gameOver';
            }
            player.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            detecteCollisionJoueurAvecObstaclesEtPieces();
            //detecteCollisionJoueurAvecSortie();
            break;
    }    
    requestAnimationFrame(animationLoop);
}

function detecteCollisionJoueurAvecObstaclesEtPieces() {
    let collisionExist = false;    
    GraphObjects.forEach((o, index) => {
        if (o instanceof Enemy) {
            if (rectsOverlap(player.x, player.y, player.l, player.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true; 
                player.hp-=5;
                GraphObjects.splice(index, 1);
                GraphObjects.push(new Xp ((o.x+o.l/2), (o.y+o.h/2), 10, 10))
                getRandomSpawn();
                o.x = randomPos.x;
                o.y = randomPos.y;
                GraphObjects.push(o);
                lifeBar.l = player.hp+5;                
                //assets.plop.play();
            } else if (rectsOverlap(frontStrike.x, frontStrike.y, frontStrike.l, frontStrike.h, o.x, o.y, o.l, o.h)){
                GraphObjects.splice(index, 1);
                GraphObjects.push(new Xp ((o.x+o.l/2), (o.y+o.h/2), 10, 10))
                getRandomSpawn();
                o.x = randomPos.x;
                o.y = randomPos.y;
                GraphObjects.push(o);
                lifeBar.l = player.hp+5;                
                //assets.plop.play();
            }
            GraphObjects.forEach((p, indexp) => {
                if (p instanceof Projectile){
                    if(rectsOverlap(p.x, p.y, p.l, p.h, o.x, o.y, o.l, o.h)){
                        GraphObjects.splice(index, 1);    
                        GraphObjects.splice(indexp, 1);  
                        GraphObjects.push(new Xp ((o.x+o.l/2), (o.y+o.h/2), 10, 10))
                        getRandomSpawn();
                        o.x = randomPos.x;
                        o.y = randomPos.y;
                        GraphObjects.push(o);
                    }
                }
            })
        } else if(o instanceof Xp) {
            if (rectsOverlap(player.x, player.y, player.l, player.h, o.x, o.y, o.l, o.h)) {
                GraphObjects.splice(index, 1);
                player.xp += 5;                
                if(player.xp>=player.lv*100){
                    player.xp-=player.lv*100;
                    player.lv++;                    
                }
                xpBar.l = player.xp+5;
                console.log(player.xp);
            }
        } 
    });

    if (collisionExist) {
        player.color = 'red';
        //gameState = 'gameOver';
        //player.x -= 10;
    } else {
        player.color= 'green';
    }
}

function testeEtatClavierPourJoueur() {        
    player.vx=((inputState.left+inputState.right)*player.speed); 
    player.vy=((inputState.up+inputState.down)*player.speed); 
    if(inputState.space==true){
        GraphObjects.push(new Projectile(player, mousePos));
    }        
}

function getRandomSpawn(){    
    switch(getRandomInt(4)){
        case 1 :            
            randomPos.x = -50;
            randomPos.y = getRandomInt(canvas.height);           
           break;
        case 2 :            
            randomPos.x = canvas.width;
            randomPos.y = getRandomInt(canvas.height);
           break;
        case 3 :   
            randomPos.x = getRandomInt(canvas.width); 
            randomPos.y = -50;          
           break;
        case 4 : 
            randomPos.x = getRandomInt(canvas.width);   
            randomPos.y = canvas.height;        
           break;

    }  
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function afficheMenuStart(ctx) {
    ctx.save()
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("Press space to start", 190, 100);
    ctx.strokeText("Press space to start", 190, 100);
    if (inputState.space) {
        gameState = 'jeuEnCours';
    }
    ctx.restore();
}

function afficheGameOver(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("GAME OVER", 0, 200);
    ctx.strokeText("GAME OVER", 0, 200);
    if (inputState.space) {
        gameState = 'menuStart';        
    }
    ctx.restore();    
}