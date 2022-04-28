import { DisplayObject } from "pixi.js"

export enum ColliderState{
    ENTER,
    STAY,
    EXIT
}

export interface ICollider extends DisplayObject {
    colliderTag: string;
    onEnter(other: ICollider): void;
    onStay(other: ICollider): void;
    onExit(other: ICollider): void;
}