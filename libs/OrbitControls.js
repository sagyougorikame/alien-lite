
import {
	EventDispatcher,
	MOUSE,
	Vector2,
	Vector3,
	Vector4,
	Quaternion,
	MathUtils,
	Spherical,
} from './three.module.js';

export class OrbitControls {
	constructor(camera, domElement) {
		this.camera = camera;
		this.domElement = domElement;
	}
	update() {}
}
