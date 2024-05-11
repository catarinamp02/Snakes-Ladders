import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

var scene, cameraP, renderer, controls, texturaLoader = new THREE.TextureLoader;
var sobreposicao = false;

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

  const axesHelper = new THREE.AxesHelper( 5 );
  axesHelper.position.set(0,1,0)
  scene.add( axesHelper );

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


  //peao amarelo
  var peaoGeometria = new THREE.ConeGeometry(0.5,1,10);
  var peao2Material = new THREE.MeshBasicMaterial({color: 0xCFAA45});
  var peao2= new THREE.Mesh(peaoGeometria, peao2Material);
  peao2.position.set(-5.5,0.4,5.5);
  peao2.name = "Jogador 2";
  scene.add(peao2);


  var texturaNeve = texturaLoader.load('./Imagens/textura_neve2.jpg')
  var texturaCenoura = texturaLoader.load('./Imagens/cenoura.jpg');
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

  
  var bonecoNeveOlhoGeometria = new THREE.SphereGeometry(0.022);
  var bonecoNeveOlhoMaterial = new THREE.MeshBasicMaterial({color:'black'})
  var bonecoNeveOlhoEsquerdo = new THREE.Mesh(bonecoNeveOlhoGeometria,bonecoNeveOlhoMaterial);
  var bonecoNeveOlhoDireito = new THREE.Mesh(bonecoNeveOlhoGeometria,bonecoNeveOlhoMaterial);

  bonecoNeveOlhoEsquerdo.position.set(0.06,1.09,0.13)
  bonecoNeveOlhoDireito.position.set(-0.06,1.09,0.13)
  
  var bonecoNeveNarizGeometria = new THREE.ConeGeometry(0.018,.1,64);
  var bonecoNeveNarizMaterial = new THREE.MeshBasicMaterial({map:texturaCenoura})
  var bonecoNeveNariz = new THREE.Mesh(bonecoNeveNarizGeometria,bonecoNeveNarizMaterial);
  bonecoNeveNariz.position.set(0,1.068,0.2)
  bonecoNeveNariz.rotateX(Math.PI/2);

  var pequenaEsferaNegraGeometria = new THREE.SphereGeometry(0.011);
  var pequenaEsferaNegraMaterial = new THREE.MeshBasicMaterial({color:'black'})
  var pequenaEsferaNegra1 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra2 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra3 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra4 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra5 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra6 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra7 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra8 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  

  // TODO: Ajustar posicionamento destas esferas para formar um sorriso e botões no peito do boneco
  pequenaEsferaNegra1.position.set(-0.069,1.03,0.14)
  pequenaEsferaNegra2.position.set(-0.053,1.02,0.18)
  // pequenaEsferaNegra3.position.set(-0.053,1.03,0.14)
  // pequenaEsferaNegra4.position.set(-0.053,1.03,0.14)
  // pequenaEsferaNegra5.position.set(-0.053,1.03,0.14)
  // pequenaEsferaNegra6.position.set(-0.053,1.03,0.14)
  // pequenaEsferaNegra7.position.set(-0.053,1.03,0.14)
  // pequenaEsferaNegra8.position.set(-0.053,1.03,0.14)

  const bonecoNeve = new THREE.Group();
  bonecoNeve.add(
      bonecoNeveBase,
      bonecoNeveMeio,
      bonecoNeveTopo,
      bonecoNeveOlhoEsquerdo, 
      bonecoNeveOlhoDireito, 
      bonecoNeveNariz,
      pequenaEsferaNegra1,
      pequenaEsferaNegra2,
      pequenaEsferaNegra3,
      pequenaEsferaNegra4,
      pequenaEsferaNegra5,
      pequenaEsferaNegra6,
      pequenaEsferaNegra7,
      pequenaEsferaNegra8);
  bonecoNeve.position.set(-5.5,0,4.5);
  bonecoNeve.name = "Boneco de neve"
  scene.add(bonecoNeve);

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
        document.getElementById('numJogadas').innerText = "Vez do "+ bonecoNeve.name + ": ";
        play(bonecoNeve, peao2, numDado, numJogadas);
      } 
      else
      { 
        document.getElementById('numJogadas').innerText = "Vez do "+ peao2.name + ": ";
        play(peao2, bonecoNeve, numDado, numJogadas);

        //Sobreposição 
        if (peao2.position.x == bonecoNeve.position.x && peao2.position.z == bonecoNeve.position.z)
        {
          bonecoNeve.position.x -= 0.3;
          peao2.position.x += 0.3;
          sobreposicao = true;
        }
        
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

function play(player1, player2, numDado, numJogadas) 
{

  //Cada quadrado no tabuleiro é 1x1 

  //Para os peões subirem para o tabuleiro na primeira jogada
  if(numJogadas < 3) {
    player1.position.y = player1.position.y + 0.3;
  }

  //Para o peão amarelo ficar alinhado com a primeira linha do tabuliero 
  if (player1.position.z == 5.5)
  {
    player1.position.z=4.5;
  }


  //Ciclo para os peões se deslocarem em função do valor do dado
  for(var i=0; i<numDado; i++)
  {

    //Restabelecer após sobreposição
    if (sobreposicao == true)
    {
      player1.position.x = player1.position.x + 0.3;
      player2.position.x = player2.position.x - 0.3;
      sobreposicao = false;
    }

    if(player1.position.z <-4.5)
    {
      player1.position.set(-4.5,player1.position.y,-4.5);
      break;
    }
  
    //-----Mudanças de linha------
    
    //Quando chega ao último quadrado da linha (sentido -> )
    if(player1.position.x==4.5)
    {
      player1.position.z = player1.position.z - 1;
      numDado=numDado-1; //A subida também conta como um passo
    }
      
    //Quando chega ao último quadrado da linha (sentido <- )
    if(player1.position.x==-4.5 && (parseInt(player1.position.z) % 2 != 0 || player1.position.z<0 ))
    {
      player1.position.z = player1.position.z - 1;
      numDado=numDado-1; //A subida também conta como um passo
    }
    
    
    //---Sentido do movimento do peão em cada linha----
    
    //Linha cujo valor inteiro de Z é par e negativo
    if(parseInt(player1.position.z) % 2 == 0 && player1.position.z<0 ) 
    {
      player1.position.x = player1.position.x - 1;
    }
    //Linha cujo valor inteiro de Z é par e positivo
    else if(parseInt(player1.position.z) % 2 == 0 && player1.position.z>0)
    {
      player1.position.x = player1.position.x + 1;
    }

    //Linha cujo valor inteiro de Z é impar e negativo
   else if(parseInt(player1.position.z) % 2 != 0 && player1.position.z<0 )
    {
      player1.position.x = player1.position.x + 1;
    }

    //Linha cujo valor inteiro de Z é impar e positivo
   else if(parseInt(player1.position.z) % 2 != 0 && player1.position.z>0)
    {
      player1.position.x = player1.position.x - 1;
    }

  }


  //Vitória 
  if (player1.position.x==-4.5 && player1.position.z==-4.5)
  {
    
   setTimeout(() => {
      alert("O " + player1.name + " ganhou!!");
      window.location.reload();
    }, 20);
  

  }

// Escadotes
if (player1.position.x==-0.5 && player1.position.z==4.5 )
  {
    player1.position.set(-2.5,player1.position.y,-0.5);
  } 
  else if (player1.position.x==1.5 && player1.position.z==3.5 )
  {
    player1.position.set(3.5,player1.position.y,0.5);
  } 

  else if (player1.position.x==2.5 && player1.position.z==-0.5 )
  {
    player1.position.set(3.5,player1.position.y,-2.5);
  } 
  else if (player1.position.x==-1.5 && player1.position.z==-1.5 )
  {
    player1.position.set(-2.5,player1.position.y,-3.5);
  }

  //Cobras 
  else if (player1.position.x==-2.5 && player1.position.z==1.5 )
  {
    player1.position.set(-4.5,player1.position.y,3.5);
  }

  else if (player1.position.x==4.5 && player1.position.z==-0.5 )
  {
    player1.position.set(4.5,player1.position.y,4.5);
  }

  else if (player1.position.x==-0.5 && player1.position.z==-2.5 )
  {
    player1.position.set(1.5,player1.position.y,-0.5);
  }

  else if (player1.position.x==4.5 && player1.position.z==-4.5 )
  {
    player1.position.set(2.5,player1.position.y,-2.5);
  }

  else if (player1.position.x==-1.5 && player1.position.z==-4.5 )
  {
    player1.position.set(-4.5,player1.position.y,-1.5);
  }


}




