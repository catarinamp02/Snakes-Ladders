import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

var scene, camera, renderer, controls, texturaLoader = new THREE.TextureLoader;
 
function init() {
  
 
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xaaaaaa);
  document.body.appendChild(renderer.domElement);

  const bege = new THREE.Color(0xCCA231);
  var texturaMesa = texturaLoader.load('./Imagens/madeira.jpg');

 
  var geometriaCubo = new THREE.BoxGeometry(15,1,15);
  var materialCubo = new THREE.MeshBasicMaterial({map:texturaMesa});
  var base = new THREE.Mesh(geometriaCubo,materialCubo);
  base.position.set(0,-1,0);
  scene.add(base);

  const texturatabuleiro = texturaLoader.load('./Imagens/base_tabuleiro.jpg');
  const tabuleiroGeometria = new THREE.BoxGeometry(10,10,0.5);
  const tabuleiroMaterial = [ 
                new THREE.MeshBasicMaterial({color: 0xCFAA45}),
                new THREE.MeshBasicMaterial({color: 0xCFAA45}),
                new THREE.MeshBasicMaterial({color: 0xCFAA45}),
                new THREE.MeshBasicMaterial({color: 0xCFAA45}),
                new THREE.MeshBasicMaterial({color: 0xCFAA45}),
                new THREE.MeshBasicMaterial({map:texturatabuleiro}),
                            ]
  const tabuleiro = new THREE.Mesh(tabuleiroGeometria, tabuleiroMaterial);

  tabuleiro.position.set(0,-0.5,0)
  tabuleiro.rotation.x = Math.PI/2;
  scene.add(tabuleiro);

  camera.position.set(0,4,28); 

  const AxesHelper = new THREE.AxesHelper(5);
  scene.add(AxesHelper);
 
  controls = new OrbitControls(camera, renderer.domElement);
 
  controls.target.set(4.5, 0, 4.5);
 
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;
 
  controls.enableDamping = true;
 
  window.requestAnimationFrame(animate);
}
 
function animate() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
 
//ajustar a janela
function onWindowResize() {
 
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
 
  renderer.setSize( window.innerWidth, window.innerHeight );
 
}
 
 
window.addEventListener('resize', onWindowResize);
 
window.onload = init;