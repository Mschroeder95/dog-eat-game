import { Texture } from "pixi.js";
import { Collider } from "../../collision/collider";
import { assetLoader } from "../../game";
import { Food } from "./food";

export class Broccolie extends Food {
    
    constructor(x: number, y: number, speed: number, rotation: number) {
        super(x, y, speed, rotation);
        this.texture = assetLoader.resources.broccoli.texture as Texture;
        this.hitBox = new Collider('broccoli-hit-box')
        //this.hitBox.beginFill(0x03fc0f); // uncomment for hitbox color
        this.hitBox.drawRect((this.texture.width/2) - 32, (this.texture.width/2) -32, 64, 64);
        this.addChild(this.hitBox);
        
    }
}