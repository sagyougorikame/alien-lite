
import * as THREE from './libs/three.module.js';

export function loadDNA(scene) {
  const geometry = new THREE.SphereGeometry(3, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
}
