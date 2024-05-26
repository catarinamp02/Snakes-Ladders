import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

var scene, cameraP,cameraO,pointLight,ambientLight, renderer, controls;
var sobreposicao = false;
var activeCamera;



function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xaaaaaa);
  document.body.appendChild(renderer.domElement);

  //----Camaras-----
  //Camara perspetiva
  cameraP = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  cameraP.position.set(0,15,5);
  activeCamera = cameraP; 


  //Camara Ortográfica 
  cameraO = new THREE.OrthographicCamera(window.innerWidth / - 100, window.innerWidth / 100, window.innerHeight / 100, window.innerHeight / - 100, 1, 1000);
  cameraO.position.set(0,10,0); 
  cameraO.lookAt(0,0,0);


  //----Iluminação-----
  //Point Light 
  pointLight = new THREE.PointLight(0xFFFFFF,300); 
  pointLight.position.set(0, 10, 0 ); 


  const pLightHelper = new THREE.PointLightHelper(pointLight,1);
  scene.add(pLightHelper);

  //Ambient Light
  ambientLight = new THREE.AmbientLight(0xFFFFFF,3);
  scene.add(ambientLight);

  var texturaLoader = new THREE.TextureLoader;

 //mesa
  var texturaMesa = texturaLoader.load('./Imagens/madeira.jpg');
  var geometriaMesa = new THREE.BoxGeometry(12,0.5,12);
  var materialMesa = new THREE.MeshStandardMaterial({map:texturaMesa});
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
      new THREE.MeshStandardMaterial({color: 0xCFAA45}),
      new THREE.MeshStandardMaterial({color: 0xCFAA45}),
      new THREE.MeshStandardMaterial({map:texturatabuleiro}), //face de cima
      new THREE.MeshStandardMaterial({color: 0xCFAA45}),
      new THREE.MeshStandardMaterial({color: 0xCFAA45}),
      new THREE.MeshStandardMaterial({color: 0xCFAA45}),
     ];

    const tabuleiro = new THREE.Mesh(tabuleiroGeometria, tabuleiroMaterial);

    tabuleiro.position.set(0,0.4,0);
    scene.add(tabuleiro);


  //peao amarelo
  var peaoGeometria = new THREE.ConeGeometry(0.5,1,10);
  var peao2Material = new THREE.MeshStandardMaterial({color: 0xCFAA45});
  var peao2= new THREE.Mesh(peaoGeometria, peao2Material);
  peao2.position.set(-5.5,0.4,5.5);
  peao2.name = "Jogador 2";
  // scene.add(carro);


  var texturaNeve = texturaLoader.load('./Imagens/textura_neve2.jpg');
  var texturaCenoura = texturaLoader.load('./Imagens/cenoura.jpg');
  //Primeiro boneco-neve
  // Esfera de topo do boneco neve
  var bonecoNeveTopoGeometria = new THREE.SphereGeometry(0.15);
  var bonecoNeveTopoMaterial = new THREE.MeshStandardMaterial({map:texturaNeve});
  var bonecoNeveTopo = new THREE.Mesh(bonecoNeveTopoGeometria,bonecoNeveTopoMaterial);
  bonecoNeveTopo.position.set(0,1.04,0);
  // Esfera do meio do boneco neve
  var bonecoNeveMeioGeometria = new THREE.SphereGeometry(0.2);
  var bonecoNeveMeioMaterial = new THREE.MeshStandardMaterial({map:texturaNeve});
  var bonecoNeveMeio = new THREE.Mesh(bonecoNeveMeioGeometria,bonecoNeveMeioMaterial);
  bonecoNeveMeio.position.set(0,0.8,0);
  // Esfera de base do boneco neve
  var bonecoNeveBaseGeometria = new THREE.SphereGeometry(0.3);
  var bonecoNeveBaseMaterial = new THREE.MeshStandardMaterial({map:texturaNeve});
  var bonecoNeveBase = new THREE.Mesh(bonecoNeveBaseGeometria,bonecoNeveBaseMaterial);
  bonecoNeveBase.position.set(0,0.5,0);
  // x = -5.5
  // z = 3.5

  
  var bonecoNeveOlhoGeometria = new THREE.SphereGeometry(0.022);
  var bonecoNeveOlhoMaterial = new THREE.MeshStandardMaterial({color:'black'});
  var bonecoNeveOlhoEsquerdo = new THREE.Mesh(bonecoNeveOlhoGeometria,bonecoNeveOlhoMaterial);
  var bonecoNeveOlhoDireito = new THREE.Mesh(bonecoNeveOlhoGeometria,bonecoNeveOlhoMaterial);

  bonecoNeveOlhoEsquerdo.position.set(0.06,1.09,0.13);
  bonecoNeveOlhoDireito.position.set(-0.06,1.09,0.13);
  
  var bonecoNeveNarizGeometria = new THREE.ConeGeometry(0.018,.1,64);
  var bonecoNeveNarizMaterial = new THREE.MeshStandardMaterial({map:texturaCenoura});
  var bonecoNeveNariz = new THREE.Mesh(bonecoNeveNarizGeometria,bonecoNeveNarizMaterial);
  bonecoNeveNariz.position.set(0,1.068,0.2);
  bonecoNeveNariz.rotateX(Math.PI/2);

  var pequenaEsferaNegraGeometria = new THREE.SphereGeometry(0.011);
  var pequenaEsferaNegraMaterial = new THREE.MeshStandardMaterial({color:'black'})
  var pequenaEsferaNegra1 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra2 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra3 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra4 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra5 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra6 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra7 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);
  var pequenaEsferaNegra8 = new THREE.Mesh(pequenaEsferaNegraGeometria,pequenaEsferaNegraMaterial);

  // Geometria dos braços boneco neve
  var bonecoNeveBracoGeometria = new THREE.CylinderGeometry(0.02,0.02,0.3,64);
  var bonecoNeveBracoMaterial = new THREE.MeshStandardMaterial({color: 0xC4A484})
  var bonecoNeveBracoEsquerdoBase = new THREE.Mesh(bonecoNeveBracoGeometria,bonecoNeveBracoMaterial);
  var bonecoNeveBracoDireitoBase = new THREE.Mesh(bonecoNeveBracoGeometria,bonecoNeveBracoMaterial);
  var bonecoNeveBracoEsquerdoTopo = new THREE.Mesh(bonecoNeveBracoGeometria,bonecoNeveBracoMaterial);
  var bonecoNeveBracoDireitoTopo = new THREE.Mesh(bonecoNeveBracoGeometria,bonecoNeveBracoMaterial);
  
  
  
  // Posicionamento das esferas que formam o sorriso e os botões do boneco de neve
  pequenaEsferaNegra1.position.set(-0.061,1.02,0.14)
  pequenaEsferaNegra2.position.set(-0.042,1.0,0.15)
  pequenaEsferaNegra3.position.set(0,0.98,0.145)
  pequenaEsferaNegra4.position.set(0.042,1.0,0.145)
  pequenaEsferaNegra5.position.set(0.061,1.02,0.14)
  pequenaEsferaNegra6.position.set(0,0.8,0.21)
  pequenaEsferaNegra7.position.set(0,0.7,0.23)
  pequenaEsferaNegra8.position.set(0,0.6,0.29)

  // Posicionamento dos braços do boneco de neve 
  bonecoNeveBracoEsquerdoBase.position.set(-.21,.82,0)
  bonecoNeveBracoDireitoBase.position.set(.18,.9,0)
  bonecoNeveBracoEsquerdoTopo.position.set(-.32,.60,0)
  bonecoNeveBracoDireitoTopo.position.set(.24,1.12,0)
  bonecoNeveBracoEsquerdoBase.rotateZ(-(5*Math.PI)/4)
  bonecoNeveBracoDireitoBase.rotateZ(-(5*Math.PI)/4)
  bonecoNeveBracoEsquerdoTopo.rotateZ((2.9*Math.PI)/3)
  bonecoNeveBracoDireitoTopo.rotateZ((0.25*Math.PI)/2)





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
      pequenaEsferaNegra8,
      bonecoNeveBracoEsquerdoBase,
      bonecoNeveBracoDireitoBase,
      bonecoNeveBracoEsquerdoTopo,
      bonecoNeveBracoDireitoTopo);
  bonecoNeve.position.set(-5.5,0,4.5);
  bonecoNeve.name = "Boneco de neve";
  scene.add(bonecoNeve);

  function criarRodas() {
    const geometriaRodas = new THREE.BoxGeometry(.12, .12, .33);
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const roda = new THREE.Mesh(geometriaRodas, material);
    return roda;
  }
  
  function criarCarro() {
    const carro = new THREE.Group();
  
    const rodaTraseira = criarRodas();
    rodaTraseira.position.y = .93;
    rodaTraseira.position.x = -.14;
    carro.add(rodaTraseira);
  
    const rodaFrente = criarRodas();
    rodaFrente.position.y = .93;
    rodaFrente.position.x = .14;
    carro.add(rodaFrente);
  
    const parteVermelha = new THREE.Mesh(
      new THREE.BoxGeometry(.60, .15, .30),
      new THREE.MeshLambertMaterial({ color: 0xa52523 })
    );
    parteVermelha.position.y = 1;
    carro.add(parteVermelha);
  
    const texturaFrenteCarro = getCarroTexturaFrente();
  
    const texturaTraseiraCarro = getCarroTexturaFrente();
  
    const texturaLadoDireitoCarro = getCarroTexturaLados();
  
    const texturaLadoEsquerdoCarro = getCarroTexturaLados();
    texturaLadoEsquerdoCarro.center = new THREE.Vector2(0.5, 0.5);
    texturaLadoEsquerdoCarro.rotation = Math.PI;
    texturaLadoEsquerdoCarro.flipY = false;
  
    const parteBranca = new THREE.Mesh(new THREE.BoxGeometry(.33, .12, .24), [
      new THREE.MeshLambertMaterial({ map: texturaFrenteCarro }),
      new THREE.MeshLambertMaterial({ map: texturaTraseiraCarro }),
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
      new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
      new THREE.MeshLambertMaterial({ map: texturaLadoDireitoCarro }),
      new THREE.MeshLambertMaterial({ map: texturaLadoEsquerdoCarro }),
    ]);
    parteBranca.position.x = 0;
    parteBranca.position.y = 1.12;
    carro.add(parteBranca);
  
    return carro;
  }
  
  
  const carro = criarCarro();
  carro.position.set(-5.5,-0.6,5.5) //-5.5,0.4,5.5
  carro.name = "Carro"
  scene.add(carro);

  function getCarroTexturaFrente() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

  function getCarroTexturaLados() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

  

  controls = new OrbitControls(activeCamera, renderer.domElement);
 
  controls.target.set(0, 0, 0); //rodar em torno deste ponto
 
  controls.enablePan = false; //Para que não seja possível mexer a camara lateralmente, apenas rodar em torno do ponto definido
  controls.maxPolarAngle = Math.PI / 2; //restricts how far the camera can tilt up or down -> Math.PI / 2 (which is 90 degrees in radians)
 
  controls.enableDamping = true; //transições mais suaves ao mexer a camara 

  document.addEventListener("keydown", onDocumentKeyDown, false);

  //Lançar dados
  var numJogadas = 1;

  document.getElementById("btnDado").addEventListener("click", function () {
      var numDado = Math.floor(Math.random() * (6 - 1 + 1) + 1);
      document.getElementById("Dado").innerText = numDado;

       if (numJogadas % 2 != 0) 
      { 
        document.getElementById('numJogadas').innerText = "Vez do "+ bonecoNeve.name + ": ";
        play(bonecoNeve, carro, numDado, numJogadas);
      } 
      else
      { 
        document.getElementById('numJogadas').innerText = "Vez do "+ carro.name + ": ";
        play(carro, bonecoNeve, numDado, numJogadas);

        //Sobreposição 
        if (carro.position.x == bonecoNeve.position.x && carro.position.z == bonecoNeve.position.z)
        {
          bonecoNeve.position.x -= 0.3;
          carro.position.x += 0.3;
          sobreposicao = true;
        }
        
      }
      numJogadas = numJogadas + 1; //Para alternar entre jogadores

  } );

  //Botão atalhos
  var coll = document.getElementById("collapsible-btn");
  var content = document.getElementById("content");

  coll.addEventListener("click", function() {
    this.classList.toggle("active");
    if (content.style.display === "block") { //Verificar o estilo atual do elemento content. Se estiver visível (block) passa invisível (none) ao carregar no botão 
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });



  animate();

}

//Função para controlo pelo teclado
function onDocumentKeyDown (event)
{
  var keyCode=event.which;

  if(keyCode == 84 && activeCamera==cameraP) //tecla t ativa a camara ortografica
  {
    activeCamera=cameraO;
  }
  else if(keyCode == 84 && activeCamera==cameraO) //carregar de novo na tecla t para desativar a camara ortográfoca
  { 
    activeCamera = cameraP;
  }
  else if(keyCode == 76 && scene.children.includes(ambientLight)) //tecla l ativa e desativa a PointLight
  {
    scene.remove(ambientLight);
    scene.add(pointLight);
  }
  else if(keyCode == 76 && scene.children.includes(pointLight)) //tecla l ativa e desativa a PointLight
  {
    scene.remove(pointLight);
    scene.add(ambientLight);
  }
  
}

let step = 0;
let speed = 0.03;

function animate(){

  /* step += speed;
  peao1.position.y = Math.abs(Math.sin(step));

  peao1.position.x += 0.008 */
  
  controls.update();
  renderer.render(scene, activeCamera);
  requestAnimationFrame(animate);
}

 
//ajustar a janela
function onWindowResize() {
 
  activeCamera.aspect = window.innerWidth / window.innerHeight;
  activeCamera.updateProjectionMatrix();
 
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




