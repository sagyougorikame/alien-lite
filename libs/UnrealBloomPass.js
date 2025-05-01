
import {
	Vector2
} from './three.module.js';

export class UnrealBloomPass {
	constructor(resolution, strength, radius, threshold) {
		this.resolution = resolution;
		this.strength = strength;
		this.radius = radius;
		this.threshold = threshold;
	}
	render() {
		console.log("UnrealBloomPass: glowing...");
	}
}
