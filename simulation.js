
import * as THREE from './libs/three.module.js';

export async function loadDNA(scene) {
  const res = await fetch('./organism1.json');
  const dna = await res.json();

  const nodeMap = {};

  // ノードを生成（球体）
  dna.nodes.forEach(node => {
    const geometry = new THREE.SphereGeometry(2, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: node.color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(node.x, node.y, 0);
    scene.add(mesh);
    nodeMap[node.id] = mesh.position;
  });

  // リンクを生成（直線）
  const positions = [];
  dna.links.forEach(link => {
    const start = nodeMap[link.source];
    const end = nodeMap[link.target];
    if (start && end) {
      positions.push(start.x, start.y, start.z);
      positions.push(end.x, end.y, end.z);
    }
  });

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);
}
