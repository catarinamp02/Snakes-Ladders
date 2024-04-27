import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

var scene, camera, renderer, controls;
 
function init() {
  
 
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xaaaaaa);
  document.body.appendChild(renderer.domElement);


  var texturaMesa = new THREE.TextureLoader().load('./Imagens/madeira.jpg');

 
  var gemoetriaCubo = new THREE.BoxGeometry(20,1,20);
  var materialCubo = new THREE.MeshBasicMaterial({map:texturaMesa});
  var base = new THREE.Mesh(gemoetriaCubo,materialCubo);
  base.position.set(0,-1,0);
  scene.add(base);

  camera.position.set(0,10,28); 

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