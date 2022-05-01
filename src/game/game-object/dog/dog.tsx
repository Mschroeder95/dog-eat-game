import { AnimatedSprite, Container, Resource, Sprite, Texture } from "pixi.js";
import { Collider } from "../../collision/collider";
import { assetLoader } from "../../game";

export class Dog extends Container {
    hitBox: Collider;
    interval: NodeJS.Timer | undefined = undefined

    staticSprite: Sprite;
    animatedSprite: AnimatedSprite
    constructor(x: number, y: number, height: number, width: number) { 
        super();

        this.position.y = y;
        this.position.x = x;
        this.staticSprite = new Sprite(assetLoader.resources.dogStatic.texture)
        this.staticSprite.width = width;
        this.staticSprite.height = height
        this.addChild(this.staticSprite);

        this.animatedSprite = new AnimatedSprite([
            assetLoader.resources.dogEating0.texture as Texture<Resource>,
            assetLoader.resources.dogEating1.texture as Texture<Resource>,
            assetLoader.resources.dogEating2.texture as Texture<Resource>,
            assetLoader.resources.dogEating3.texture as Texture<Resource>,
            assetLoader.resources.dogEating4.texture as Texture<Resource>,
        ])
        this.animatedSprite.height = height;
        this.animatedSprite.width = width;
        this.animatedSprite.animationSpeed = .6;
        this.animatedSprite.visible = false;
        this.addChild(this.animatedSprite);

        this.hitBox = new Collider('dog-hit-box');
        //this.hitBox.beginFill(0x03fc0f); // uncomment for hitbox color
        this.hitBox.drawRect(width/2 - 12, height/1.5 , 24, 24)
        this.addChild(this.hitBox)
        
        this.setupControls();
    }

    setupControls() {
        document.addEventListener('keydown', (event) => {
            if(event.repeat) {
                return
            }
            if(event.key == 'ArrowLeft') {
                this.move('left')
            } else if(event.key == 'ArrowRight') {
                this.move('right')
            }
        })

        document.addEventListener('keyup', (event) => {
            clearInterval(this.interval as NodeJS.Timer);
        })
    }

    doDestroy(): void {
        this.hitBox.destroy();
        this.destroy();
    }

    eat(): void {
        this.staticSprite.visible = false;
        this.animatedSprite.visible = true;
        this.animatedSprite.play();
        setTimeout(() => {
            this.staticSprite.visible = true;
            this.animatedSprite.visible = false;
            this.animatedSprite.stop();
        }, 1000);
    }

    move(direction: string) {
        clearInterval(this.interval as NodeJS.Timer);

        if(direction == 'left') {
            this.interval = setInterval(() => {
                this.position.x--
            }, 2)
        } else if(direction == 'right') {
            this.interval = setInterval(() => {
                this.position.x++
            }, 2)
        }
    }
}