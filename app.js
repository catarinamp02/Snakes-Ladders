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
  var peaoGeometria = new THREE.ConeGeometry(0.4,0.5,3);
  var peao1Material = new THREE.MeshBasicMaterial({color: 0xFF5733});
  var peao1= new THREE.Mesh(peaoGeometria, peao1Material);
  peao1.position.set(-5.5,0.4,4.5);
  peao1.name = "Vermelho";
  scene.add(peao1);

  //peao amarelo
  var peao2Material = new THREE.MeshBasicMaterial({color: 0xCFAA45});
  var peao2= new THREE.Mesh(peaoGeometria, peao2Material);
  peao2.position.set(-5.5,0.4,5.5);
  peao2.name = "Amarelo";
  scene.add(peao2);


  var texturaNeve = texturaLoader.load('./Imagens/textura_neve2.jpg')
  //Primeiro boneco-neve
  // Esfera de topo do boneco neve
  var bonecoNeveTopoGeometria = new THREE.SphereGeometry(0.15)
  var bonecoNeveTopoMaterial = new THREE.MeshBasicMaterial({map:texturaNeve}) 
  var bonecoNeveTopo = new THREE.Mesh(bonecoNeveTopoGeometria,bonecoNeveTopoMaterial);
  bonecoNeveTopo.position.set(0,1.04,0);
  // Esfera do meio do boneco neve
  var bonecoNeveMeioGeometria = new THREE.SphereGeometry(0.2)
  var bonecoNeveMeioMaterial = new THREE.MeshBasicMaterial({map:texturaNeve}) 
  var bonecoNeveMeio = new THREE.Mesh(bonecoNeveMeioGeometria,bonecoNeveMeioMaterial);
  bonecoNeveMeio.position.set(0,0.8,0);
  // Esfera de base do boneco neve
  var bonecoNeveBaseGeometria = new THREE.SphereGeometry(0.3)
  var bonecoNeveBaseMaterial = new THREE.MeshBasicMaterial({map:texturaNeve}) 
  var bonecoNeveBase = new THREE.Mesh(bonecoNeveBaseGeometria,bonecoNeveBaseMaterial);
  bonecoNeveBase.position.set(0,0.5,0);
  // x = -5.5
  // z = 3.5

  
  var bonecoNeveOlhoEsquerdoGeometria = new THREE.SphereGeometry(0.09);
  
  
  const bonecoNeve1 = new THREE.Group();
  bonecoNeve1.add(bonecoNeveBase,bonecoNeveMeio,bonecoNeveTopo);
  bonecoNeve1.position.set(-5.5,0,4.5);
  scene.add(bonecoNeve1);



  //Cada quadrado no tabuleiro são 1x1 

  cameraP.position.set(0,15,5); 

  controls = new OrbitControls(cameraP, renderer.domElement);
 
  controls.target.set(0, 0, 0); //rodar em torno deste ponto
 
  controls.enablePan = false; //Para que não seja possível mexer a camara lateralmente, apenas rodar em torno do ponto definido
  controls.maxPolarAngle = Math.PI / 2; //restricts how far the camera can tilt up or down -> Math.PI / 2 (which is 90 degrees in radians)
 
  controls.enableDamping = true; //transições mais suaves ao mexer a camara


  //Lançar dados
  var numJogadas = 1;

  document.getElementById("btnDado").addEventListener("click", function () {
      var numDado = Math.floor(Math.random() * (6 - 1 + 1) + 1);
      document.getElementById("Dado").innerText = numDado;

       if (numJogadas % 2 != 0) 
      {
        document.getElementById('numJogadas').innerText = "Vez do vermelho: ";
        play(peao1,numDado, numJogadas);
      } 
      else
      {
        document.getElementById('numJogadas').innerText = "Vez do amarelo: ";
        play(peao2,numDado, numJogadas);
      }
      numJogadas = numJogadas + 1; //Para alternar entre jogadores
      
  } );

  

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

function play(player, numDado, numJogadas) 
{

  //Para os peões subirem para o tabuleiro na primeira jogada
  if(numJogadas < 3) {
    player.position.y = player.position.y + 0.3;
  }

  //Para o peão amarelo ficar alinhado com a primeira linha do tabuliero 
  if (player.position.z == 5.5)
  {
    player.position.z=4.5;
  }

  //Ciclo para os peões se deslocarem em função do valor do dado
  for(var i=0; i<numDado; i++)
  {



    //-----Mudanças de linha------

    //Quando chega ao último quadrado da linha (sentido -> )
   if(player.position.x==4.5)
    {
      player.position.z = player.position.z - 1;
      numDado=numDado-1; //A subida também conta como um passo
    }

    //Quando chega ao último quadrado da linha (sentido <- )
   if(player.position.x==-4.5 && (parseInt(player.position.z) % 2 != 0 || player.position.z<0 ))
    {
      player.position.z = player.position.z - 1;
      numDado=numDado-1; //A subida também conta como um passo
    }
    

    //---Sentido do movimento do peão em cada linha----

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
    
    //Vitória 
/*     if ((player.position.x==-4.5 && player.position.z==-4.5) ||  player.position.z<-4.5)
    {
      player.position.set(-4.5,player.position.y,-4.5);
      alert("O "+ player.name +" ganhou!!");
      location.reload();
    } */
  }

// Escadotes
if (player.position.x==-0.5 && player.position.z==4.5 )
  {
    player.position.set(-2.5,player.position.y,-0.5);
  } 
  else if (player.position.x==1.5 && player.position.z==3.5 )
  {
    player.position.set(3.5,player.position.y,0.5);
  } 

  else if (player.position.x==2.5 && player.position.z==-0.5 )
  {
    player.position.set(3.5,player.position.y,-2.5);
  } 
  else if (player.position.x==-1.5 && player.position.z==-1.5 )
  {
    player.position.set(-2.5,player.position.y,-3.5);
  }

  //Cobras 
  else if (player.position.x==-1.5 && player.position.z==-1.5 )
  {
    player.position.set(-2.5,player.position.y,-3.5);
  }





  

}




