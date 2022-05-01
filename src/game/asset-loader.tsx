import { Dict } from "@pixi/utils";
import { Loader, LoaderResource } from "pixi.js";

export class AssetLoader extends Loader {
    resources: Dict<LoaderResource> = {}

    constructor() {
        super();
        let public_dir = process.env.PUBLIC_URL;

        this.add('dogStatic', `${public_dir}/assets/img/dog.png`)
            .add('dogEating0', `${public_dir}/assets/img/dog-eating-0.png`)
            .add('dogEating1', `${public_dir}/assets/img/dog-eating-1.png`)
            .add('dogEating2', `${public_dir}/assets/img/dog-eating-2.png`)
            .add('dogEating3', `${public_dir}/assets/img/dog-eating-3.png`)
            .add('dogEating4', `${public_dir}/assets/img/dog-eating-4.png`)
            .add('broccoli',`${public_dir}/assets/img/broccoli.png`)
            .add('bone',`${public_dir}/assets/img/bone.png`)
    }

    loadAssets(): Promise<any> {
        let complete = new Promise((resolve, reject) => {
            this.load((loader, resources) => {
                this.resources = resources;
                resolve(1)
            })
        })
        return complete
    }
}


