
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.module.js';

const CELL_RADIUS = 1.8;
const SPRING_STIFFNESS = 0.03;
const SPRING_DAMPING = 0.9;
const MASS = 1.0;

const cellMap = new Map();
const velocities = new Map();
const springs = [];
let sceneRef = null;

export function loadDNA(scene) {
  sceneRef = scene;
  fetch('./data/organism1.json')
    .then(res => res.json())
    .then(dna => {
      initFromDNA(scene, dna);
      setInterval(() => {
        const mutated = mutateDNA(dna);
        initFromDNA(scene, mutated);
      }, 5000);
    });
}

function mutateDNA(originalDNA) {
  const offsetX = (Math.random() - 0.5) * 40;
  const offsetY = (Math.random() - 0.5) * 40;

  const mutatedCells = originalDNA.cells.map(cell => {
    return {
      ...cell,
      x: cell.x + offsetX + (Math.random() - 0.5) * 5,
      y: cell.y + offsetY + (Math.random() - 0.5) * 5,
      color: randomColor()
    };
  });

  return {
    cells: mutatedCells,
    edges: originalDNA.edges.slice()
  };
}

function randomColor() {
  const r = Math.floor(100 + Math.random() * 155).toString(16).padStart(2, '0');
  const g = Math.floor(100 + Math.random() * 155).toString(16).padStart(2, '0');
  const b = Math.floor(100 + Math.random() * 155).toString(16).padStart(2, '0');
  return '#' + r + g + b;
}

function initFromDNA(scene, dna) {
  const geometry = new THREE.CircleGeometry(CELL_RADIUS, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const localMap = new Map();
  const localVelocities = new Map();

  dna.cells.forEach(cell => {
    const mat = material.clone();
    mat.color.set(cell.color);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(cell.x, cell.y, 0);
    scene.add(mesh);
    localMap.set(cell.id, mesh);
    localVelocities.set(cell.id, new THREE.Vector3());
  });

  dna.edges.forEach(([a, b]) => {
    const pa = localMap.get(a).position;
    const pb = localMap.get(b).position;
    const restLength = pa.distanceTo(pb);
    springs.push({ a, b, restLength, map: localMap, vel: localVelocities });
  });

  cellMap.set(dna, localMap);
  velocities.set(dna, localVelocities);

  const edgeGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(dna.edges.length * 2 * 3);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
  const lines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  scene.add(lines);

  animateSprings(edgeGeometry, positions, dna);
}

function animateSprings(geometry, positions, dnaKey) {
  function step() {
    springs.forEach(({ a, b, restLength, map, vel }) => {
      const pa = map.get(a).position;
      const pb = map.get(b).position;
      const va = vel.get(a);
      const vb = vel.get(b);

      const delta = new THREE.Vector3().subVectors(pb, pa);
      const dist = delta.length();
      const forceMag = SPRING_STIFFNESS * (dist - restLength);
      const force = delta.normalize().multiplyScalar(forceMag);

      va.add(force.clone().multiplyScalar(1 / MASS));
      vb.sub(force.clone().multiplyScalar(1 / MASS));
    });

    springs.forEach(({ map, vel }) => {
      map.forEach((mesh, id) => {
        const v = vel.get(id);
        v.multiplyScalar(SPRING_DAMPING);
        mesh.position.add(v);
      });
    });

    // Position update only for the last added structure
    const map = cellMap.get(dnaKey);
    let i = 0;
    springs.forEach(({ a, b, map: localMap }) => {
      const pa = localMap.get(a).position;
      const pb = localMap.get(b).position;
      positions.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], i * 6);
      i++;
    });
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.attributes.position.needsUpdate = true;

    requestAnimationFrame(step);
  }
  step();
}
