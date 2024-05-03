import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

var scene, cameraP, renderer, controls, texturaLoader = new THREE.TextureLoader;
 
function init() {
  
 
  scene = new THREE.Scene();
  cameraP = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xaaaaaa);
  document.body.appendChild(renderer.domElement);

  var texturaMesa = texturaLoader.load('./Imagens/madeira.jpg');

 //mesa
  var geometriaMesa = new THREE.BoxGeometry(12,0.5,12);
  var materialMesa = new THREE.MeshBasicMaterial({map:texturaMesa});
  var base = new THREE.Mesh(geometriaMesa,materialMesa);
  base.position.set(0,0,0);
  scene.add(base);


  //tabuleiro
  const texturatabuleiro = texturaLoader.load('./Imagens/base_tabuleiro.jpg');
  const tabuleiroGeometria = new THREE.BoxGeometry(10,0.3,10);

    const tabuleiroMaterial = [ 
      new THREE.MeshBasicMaterial({color: 0xCFAA45}),
      new THREE.MeshBasicMaterial({color: 0xCFAA45}),
      new THREE.MeshBasicMaterial({map:texturatabuleiro}), //face de cima
      new THREE.MeshBasicMaterial({color: 0xCFAA45}),
      new THREE.MeshBasicMaterial({color: 0xCFAA45}),
      new THREE.MeshBasicMaterial({color: 0xCFAA45}),
     ];

    const tabuleiro = new THREE.Mesh(tabuleiroGeometria, tabuleiroMaterial);

    tabuleiro.position.set(0,0.4,0);
    scene.add(tabuleiro);


  //peao
  const peaoGeometria = new THREE.ConeGeometry(0.4,0.5,3);
  const peaoMaterial = new THREE.MeshBasicMaterial({color: 0xCFAA45});
  const peao= new THREE.Mesh(peaoGeometria, peaoMaterial);
  peao.position.set(-4.5,0.7,4.5);
  scene.add(peao);

  //Cada quadrado no tabuleiro são 0.5x0.5 

  cameraP.position.set(0,15,5); 

  controls = new OrbitControls(cameraP, renderer.domElement);
 
  controls.target.set(0, 0, 0); //rodar em torno deste ponto
 
  controls.enablePan = false; //Para que não seja possível mexer a camara lateralmente, apenas rodar em torno do ponto definido
  controls.maxPolarAngle = Math.PI / 2; //restricts how far the camera can tilt up or down -> Math.PI / 2 (which is 90 degrees in radians)
 
  controls.enableDamping = true; //transições mais suaves ao mexer a camara
 
  window.requestAnimationFrame(animate);

}
 
function animate() {
  controls.update();
  renderer.render(scene, cameraP);
  window.requestAnimationFrame(animate);
}
 
//ajustar a janela
function onWindowResize() {
 
  cameraP.aspect = window.innerWidth / window.innerHeight;
  cameraP.updateProjectionMatrix();
 
  renderer.setSize( window.innerWidth, window.innerHeight );
 
}
 
 
window.addEventListener('resize', onWindowResize);
 
window.onload = init;