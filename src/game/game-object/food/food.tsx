import { Sprite } from "pixi.js";
import { Collider } from "../../collision/collider";
import { Game, sampleRate } from "../../game";


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
}