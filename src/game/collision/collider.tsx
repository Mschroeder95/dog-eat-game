import { Graphics } from "pixi.js";
import { CollisionDetector } from "./collision-detector";

export enum ColliderState{
    ENTER,
    STAY,
    EXIT
}

export class Collider extends Graphics {
    colliderTag: string;
    onEnterCallbacks: ((other: Collider) => void)[] = [];
    onStayCallbacks: ((other: Collider) => void)[] = [];
    onExitCallbacks: ((other: Collider) => void)[] = [];
    private colliderStates: Map<Collider, ColliderState> = new Map()

    constructor(colliderTag: string) {
            super();
            this.colliderTag = colliderTag;
            CollisionDetector.addCollider(this)
    }

    onEnter(other: Collider): void {
        if(this.colliderStates.get(other) == ColliderState.ENTER || this.colliderStates.get(other) == undefined) {
            for(let callback of this.onEnterCallbacks){
                callback(other);
            }
            this.colliderStates.set(other, ColliderState.STAY);
        }
    }

    onStay(other:Collider): void {
        if(this.colliderStates.get(other) == ColliderState.STAY) {
            for(let callback of this.onStayCallbacks) {
                callback(other);
            }
            this.colliderStates.set(other, ColliderState.EXIT);
        }
    }

    onExit(other:Collider): void {
        if(this.colliderStates.get(other) == ColliderState.EXIT) {
            for(let callback of this.onExitCallbacks) {
                callback(other);
            }
            this.colliderStates.set(other, ColliderState.ENTER)
        }
    }

    addCallback(state: ColliderState, callback: (other: Collider) => void) {
        if(state == ColliderState.ENTER) {
            this.onEnterCallbacks.push(callback);
        } else if(state == ColliderState.STAY) {
            this.onStayCallbacks.push(callback);
        } else if(state == ColliderState.EXIT) {
            this.onExitCallbacks.push(callback);
        }
    }
    
}