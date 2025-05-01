
import {
	WebGLRenderTarget,
	LinearFilter,
	RGBAFormat,
	HalfFloatType
} from './three.module.js';

export class EffectComposer {
	constructor(renderer) {
		this.renderer = renderer;
		this.passes = [];
	}
	addPass(pass) {
		this.passes.push(pass);
	}
	render() {
		for (const pass of this.passes) {
			pass.render();
		}
	}
}
