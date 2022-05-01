import { Sprite } from "pixi.js";
import { Collider } from "../../collision/collider";
import { Game, sampleRate } from "../../game";
import { Bone } from "./bone";
import { Broccolie } from "./broccoli";


export abstract class Food extends Sprite {
    fall: NodeJS.Timer | undefined;
    hitBox!: Collider;

    constructor(x: number, y: number, private speed: number, rotation: number) {
        super();

        this.position.x = x;
        this.position.y = y;
        this.width = 128;
        this.height = 128;
        this.pivot.set(this.texture.width/2,this.texture.width/2);
        this.rotation = rotation;
    }

    doDestroy() {
        clearInterval(this.fall as NodeJS.Timer);
        this.hitBox.destroy();
        this.destroy();
    }

    doFall() {
        this.fall = setInterval(()=> {
            this.position.y += this.speed;
            if(this.position.y > Game.height) {
                this.doDestroy();
            }
        }, sampleRate);
    }

    static createRandom(): Food {
        
        let randomX = Math.floor(Math.random() * (Game.width - 128)) + 64;
        let randomSpeed = Math.floor(Math.random() * 3 + 1);
        let randomRotation = Math.random() * 2;
        
        let food: Food;
        if(Math.random() > .5) {
            food = new Bone(randomX, -128, randomSpeed, randomRotation);
        } else {
            food = new Broccolie(randomX, -128, randomSpeed, randomRotation);
        }

        return food;
    }
}