import { Application, IApplicationOptions } from "pixi.js";
import { AssetLoader } from "./asset-loader";
import { ColliderState } from "./collision/collider";
import { Dog } from "./game-object/dog/dog";
import { Bone } from "./game-object/food/bone";
import { Broccoli } from "./game-object/food/broccoli";
import { Food } from "./game-object/food/food";

export const assetLoader = new AssetLoader();
export const sampleRate = 10;
export class Game {
    static pixiApp: Application | undefined;
    static running: boolean = false;
    static height: number;
    static width: number

    private constructor() {

    }

    static run(height:number, width:number, parentElement: HTMLElement) {
        if(!this.running) {                    
            this.running = true;
            assetLoader.loadAssets().then(
                () => {
                    Game.height = height;
                    Game.width = width;
                    let options: IApplicationOptions = {};
                    options.height = Game.height;
                    options.width = Game.width;
                    this.pixiApp = new Application(options);
                    parentElement.appendChild(this.pixiApp.view);

                    let dog = new Dog(0, (this.pixiApp?.view.height as number) - 256, 256, 256);
                    Game.configDogCollision(dog);
                    this.pixiApp?.stage.addChild(dog);
                    setInterval(() => {
                        let food = Game.createRandom();
                        this.pixiApp?.stage.addChild(food);
                        this.configFoodCollision(food);
                        food.doFall();
                    }, 1000);
                })
        }
    }

    static createRandom(): Food {
        
        let randomX = Math.floor(Math.random() * (Game.width - 128)) + 64;
        let randomSpeed = Math.floor(Math.random() * 3 + 1);
        let randomRotation = Math.random() * 2;
        
        let food: Food;
        if(Math.random() > .5) {
            food = new Bone(randomX, -128, randomSpeed, randomRotation);
        } else {
            food = new Broccoli(randomX, -128, randomSpeed, randomRotation);
        }

        return food;
    }

    private static configFoodCollision(food:Food) {
        food.hitBox.addCallback(ColliderState.ENTER, (other) => {
            if(food.hitBox.colliderTag == 'bone-hit-box' && other.colliderTag == 'dog-hit-box') {
                food.doDestroy();
            }
        })
        food.hitBox.addCallback(ColliderState.STAY, (other) => {
            if(food.hitBox.colliderTag == 'broccoli-hit-box' && other.colliderTag == 'dog-hit-box') {
                console.log('YUCK!')
            }
        })
        food.hitBox.addCallback(ColliderState.EXIT, (other) => {
            if(food.hitBox.colliderTag == 'broccoli-hit-box' && other.colliderTag == 'dog-hit-box') {
                console.log('GO AWAY!')
            }
        })
    }

    private static configDogCollision(dog:Dog) {
        dog.hitBox.addCallback(ColliderState.ENTER, (other)=>{
            if(other.colliderTag == 'bone-hit-box') {
                dog.eat();
            }
        });
    }

}