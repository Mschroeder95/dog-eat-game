import { Graphics } from "pixi.js";
import { CollisionDetector } from "./collision-detector";
import { ColliderState, ICollider } from "./i-collider";

export class Collider extends Graphics implements ICollider {
    colliderTag: string;
    onEnterCallbacks: ((other: ICollider) => void)[] = [];
    onStayCallbacks: ((other: ICollider) => void)[] = [];
    onExitCallbacks: ((other: ICollider) => void)[] = [];
    private colliderStates: Map<ICollider, ColliderState> = new Map()

    constructor(colliderTag: string) {
            super();
            this.colliderTag = colliderTag;
            CollisionDetector.addCollider(this)
    }

    onEnter(other: ICollider): void {
        if(this.colliderStates.get(other) == ColliderState.ENTER || this.colliderStates.get(other) == undefined) {
            for(let callback of this.onEnterCallbacks){
                callback(other);
            }
            this.colliderStates.set(other, ColliderState.STAY);
        }
    }

    onStay(other:ICollider): void {
        if(this.colliderStates.get(other) == ColliderState.STAY) {
            for(let callback of this.onStayCallbacks) {
                callback(other);
            }
            this.colliderStates.set(other, ColliderState.EXIT);
        }
    }

    onExit(other:ICollider): void {
        if(this.colliderStates.get(other) == ColliderState.EXIT) {
            for(let callback of this.onExitCallbacks) {
                callback(other);
            }
            this.colliderStates.set(other, ColliderState.ENTER)
        }
    }

    addCallback(state: ColliderState, callback: (other: ICollider) => void) {
        if(state == ColliderState.ENTER) {
            this.onEnterCallbacks.push(callback);
        } else if(state == ColliderState.STAY) {
            this.onStayCallbacks.push(callback);
        } else if(state == ColliderState.EXIT) {
            this.onExitCallbacks.push(callback);
        }
    }
    
}