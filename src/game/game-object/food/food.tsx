import { Sprite } from "pixi.js";
import { Collider } from "../../collision/collider";
import { assetLoader, Game, sampleRate } from "../../game";

enum FoodType {
    BONE,
    BROCCOLI
}
export class Food extends Sprite {
    fall: NodeJS.Timer | undefined;
    hitBox: Collider;

    constructor(foodType: FoodType, x: number, y: number, private speed: number, rotation: number) {
        super();

        this.position.x = x;
        this.position.y = y;
        this.width = 128;
        this.height = 128;
        this.pivot.set(this.texture.width/2,this.texture.width/2);
        this.rotation = rotation

        if(foodType == FoodType.BONE) {
            this.texture = assetLoader.textures.food.boneTexture;
            this.hitBox = new Collider('bone-hit-box')
        } else {
            this.texture = assetLoader.textures.food.broccoliTexture;
            this.hitBox = new Collider('broccoli-hit-box')
        }   
        //this.hitBox.beginFill(0x03fc0f); // uncomment for hitbox color
        this.hitBox.drawRect((this.texture.width/2) - 32, (this.texture.width/2) -32, 64, 64)
        this.addChild(this.hitBox)
    }

    doDestroy() {
        clearInterval(this.fall as NodeJS.Timer)
        this.hitBox.destroy();
        this.destroy()
    }

    doFall() {
        this.fall = setInterval(()=> {
            this.position.y += this.speed;
            if(this.position.y > Game.height) {
                this.doDestroy()
            }
        }, sampleRate)
    }

    static createRandom(): Food {
        
        let randomX = Math.floor(Math.random() * (Game.width - 128)) + 64
        let randomSpeed = Math.floor(Math.random() * 3 + 1)
        let randomRotation = Math.random() * 2
        let foodType: FoodType

        if(Math.random() > .5) {
            foodType = FoodType.BROCCOLI;
        } else {
            foodType = FoodType.BONE;
        }

        return new Food(foodType, randomX, -128, randomSpeed, randomRotation)
    }
}