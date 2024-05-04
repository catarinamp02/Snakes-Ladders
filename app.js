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


  //peao vermelho
  const peaoGeometria = new THREE.ConeGeometry(0.4,0.5,3);
  const peao1Material = new THREE.MeshBasicMaterial({color: 0xFF5733});
  const peao1= new THREE.Mesh(peaoGeometria, peao1Material);
  peao1.position.set(-5.5,0.7,4.5);
  scene.add(peao1);

  //peao amarelo
  const peao2Material = new THREE.MeshBasicMaterial({color: 0xCFAA45});
  const peao2= new THREE.Mesh(peaoGeometria, peao2Material);
  peao2.position.set(-5.5,0.4,5.5);
  scene.add(peao2);

  //Cada quadrado no tabuleiro são 0.5x0.5 

  cameraP.position.set(0,15,5); 

  controls = new OrbitControls(cameraP, renderer.domElement);
 
  controls.target.set(0, 0, 0); //rodar em torno deste ponto
 
  controls.enablePan = false; //Para que não seja possível mexer a camara lateralmente, apenas rodar em torno do ponto definido
  controls.maxPolarAngle = Math.PI / 2; //restricts how far the camera can tilt up or down -> Math.PI / 2 (which is 90 degrees in radians)
 
  controls.enableDamping = true; //transições mais suaves ao mexer a camara


  //Lançar dados

  var tog = 1;

  document.getElementById("btnDado").addEventListener("click", function () {
      var numDado = Math.floor(Math.random() * (6 - 1 + 1) + 1);
      document.getElementById("Dado").innerText = numDado;
  
       if (tog % 2 != 0) 
      {
        document.getElementById('tog').innerText = "Vez do vermelho: ";
        play(peao1,numDado);
      } 
      else if (tog % 2 == 0)
      {
        document.getElementById('tog').innerText = "Vez do amarelo: ";
        play(peao2,numDado);
      }
  
      tog = tog + 1;
  });

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
 
//lógica do jogo

function play(player, numDado) 
{
  //Colocar o peão no tabuleiro 
  player.position.y = player.position.y + 0.3;

  //Para o peão amarelo ficar alinhado com a primeira linha do tabuliero 
  if (player.position.z == 5.5)
  {
    player.position.z=4.5;
  }

  for(var i=0; i<numDado; i++)
  {

/*     //Escadote
   if (player.position.x== -0.5 && player.position.z== 4.5 )
    {
      player.position.set (-2.5,player.position.y,-0.5);
    } */

    //mudanças de linha
     if(player.position.x==4.5)
    {
      player.position.z = player.position.z - 1;
    }

    //Sentido do movimento do peão em cada linha

    //Linha cujo valor inteiro de Z é par e negativo
    if(parseInt(player.position.z) % 2 == 0 && player.position.z<0 ) 
    {
      player.position.x = player.position.x - 1;
    }
    //Linha cujo valor inteiro de Z é par e positivo
    else if(parseInt(player.position.z) % 2 == 0 && player.position.z>0)
    {
      player.position.x = player.position.x + 1;
    }

    //Linha cujo valor inteiro de Z é impar e negativo
   else if(parseInt(player.position.z) % 2 != 0 && player.position.z<0 )
    {
      player.position.x = player.position.x + 1;
    }

    //Linha cujo valor inteiro de Z é impar e positivo
  else if(parseInt(player.position.z) % 2 != 0 && player.position.z>0)
    {
      player.position.x = player.position.x - 1;
    }

  }

}




