
import * as THREE from './libs/three.module.js';
import { OrbitControls } from './libs/OrbitControls.js';
import { EffectComposer } from './libs/EffectComposer.js';
import { RenderPass } from './libs/RenderPass.js';
import { UnrealBloomPass } from './libs/UnrealBloomPass.js';
import GUI from './libs/lil-gui.module.js';

import { loadDNA } from './simulation.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00001a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.4, 0.85);
composer.addPass(bloomPass);

loadDNA(scene);

const gui = new GUI();
gui.add(bloomPass, 'strength', 0, 3).name('Glow Strength');
gui.add(bloomPass, 'radius', 0, 1).name('Glow Radius');
gui.add(bloomPass, 'threshold', 0, 1).name('Glow Threshold');

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  composer.render();
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // composer.setSize is unavailable in minimal version, so omit it
});
