
import {
	Color
} from './three.module.js';

export class RenderPass {
	constructor(scene, camera) {
		this.scene = scene;
		this.camera = camera;
	}
	render() {
		console.log("RenderPass: rendering scene");
	}
}
