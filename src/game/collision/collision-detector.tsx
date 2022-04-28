import { Rectangle } from "pixi.js";
import { sampleRate } from "../game";
import { ICollider } from "./i-collider";

export class CollisionDetector {
    private static running = false;
    private static nextKey = 0;
    static colliders: Map<number, ICollider> = new Map();
    
    private static detect() {
        let callback = () => {
            CollisionDetector.handleCollision().then(()=> {
                setTimeout(() => {
                    CollisionDetector.detect();
                }, sampleRate);
            })
        }

        callback();
    }

    private static handleCollision(): Promise<any> {
        return new Promise((resolve, reject)=> {
            let slice = 1
            let allColliders = CollisionDetector.colliders
            allColliders.forEach((collider, key) => {
                let c = Array.from(allColliders.keys()).slice(slice)
                c.forEach((otherKey)=> {
                    let otherCollider = allColliders.get(otherKey) as ICollider
                    try {
                        if(collider.destroyed) {
                            allColliders.delete(key)
                            resolve(1)
                        }
                        if(otherCollider.destroyed) {
                            allColliders.delete(otherKey)
                            resolve(1);
                        }
                        if(CollisionDetector.intersect(collider.getBounds(), otherCollider.getBounds())) {
                            collider.onStay(otherCollider);
                            collider.onEnter(otherCollider);
                            otherCollider.onStay(collider);
                            otherCollider.onEnter(collider);
                        }else {
                            collider.onExit(otherCollider);
                            otherCollider.onExit(collider)
                        }
                    } catch(error) {
                        resolve(1)
                    }
                    })
                slice++;
            });
            resolve(1);
        });
    }

    private static intersect(a: Rectangle, b: Rectangle): boolean {
        return a.x + a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height;
    }

    static addCollider(collider: ICollider) {
        if(!this.running) {
            this.running = true;
            CollisionDetector.detect();
        }
        let key = CollisionDetector.nextKey++;
        CollisionDetector.colliders.set(key, collider);
    }
}