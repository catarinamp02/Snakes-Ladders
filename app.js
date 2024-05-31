import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { PointerLockControls } from 'PointerLockControls';

var scene, cameraP,cameraO,pointLight,ambientLight, renderer, orbitControls;
var sobreposicao = false;
var activeCamera;
var mixerAnimacao;
var relogio = new THREE.Clock();
var importer = new GLTFLoader();

var controls;




importer.load('./Objetos/floor_stones_tilleable/scene.gltf', function(chaoImportado){
  mixerAnimacao = new THREE.AnimationMixer(chaoImportado);

  
  scene.add(chaoImportado.scene);
  chaoImportado.scene.scale.x = 0.02
  chaoImportado.scene.scale.y = 0.02
  chaoImportado.scene.scale.z = 0.02
  chaoImportado.scene.position.y = -7
  chaoImportado.scene.position.z = -2
  
  chaoImportado.animations; // Array<THREE.AnimationClip>
  chaoImportado.scene; // THREE.Group
  chaoImportado.scenes; // Array<THREE.Group>
  chaoImportado.cameras; // Array<THREE.Camera>
  chaoImportado.asset; // Object
});


importer.load('./Objetos/realistic_feudal_japan_roof/scene.gltf', function(telhado3){  
  mixerAnimacao = new THREE.AnimationMixer(telhado3);

  
  scene.add(telhado3.scene);
  telhado3.scene.scale.x = 3 
  telhado3.scene.scale.y =  2
  telhado3.scene.scale.z = 3
  telhado3.scene.position.y = 11
  
  telhado3.animations; // Array<THREE.AnimationClip>
  telhado3.scene; // THREE.Group
  telhado3.scenes; // Array<THREE.Group>
  telhado3.cameras; // Array<THREE.Camera>
  telhado3.asset; // Object
})




importer.load('./Objetos/wall_window/scene.gltf', function(paredeImportada1){
  mixerAnimacao = new THREE.AnimationMixer(paredeImportada1)
  
  paredeImportada1.scene.scale.x = 13.7
  paredeImportada1.scene.scale.y = 9
  paredeImportada1.scene.scale.z = 9
  paredeImportada1.scene.position.x = 1.3
  paredeImportada1.scene.position.y = -7
  paredeImportada1.scene.position.z = -12
  scene.add(paredeImportada1.scene)
  
  paredeImportada1.animations; // Array<THREE.AnimationClip>
  paredeImportada1.scene; // THREE.Group
  paredeImportada1.scenes; // Array<THREE.Group>
  paredeImportada1.cameras; // Array<THREE.Camera>
  paredeImportada1.asset; // Object
})


importer.load('./Objetos/wall_window/scene.gltf', function(paredeImportada2){
  mixerAnimacao = new THREE.AnimationMixer(paredeImportada2)
  
  paredeImportada2.scene.scale.x = 13.7
  paredeImportada2.scene.scale.y = 9
  paredeImportada2.scene.scale.z = 9
  paredeImportada2.scene.position.x = 1.3
  paredeImportada2.scene.position.y = -7
  paredeImportada2.scene.position.z = 12
  scene.add(paredeImportada2.scene)

  paredeImportada2.animations; // Array<THREE.AnimationClip>
  paredeImportada2.scene; // THREE.Group
  paredeImportada2.scenes; // Array<THREE.Group>
  paredeImportada2.cameras; // Array<THREE.Camera>
  paredeImportada2.asset; // Object
})
importer.load('./Objetos/wall_window/scene.gltf', function(paredeImportada3){
  mixerAnimacao = new THREE.AnimationMixer(paredeImportada3)
  
  paredeImportada3.scene.scale.x = 9
  paredeImportada3.scene.scale.y = 9
  paredeImportada3.scene.scale.z = 9
  paredeImportada3.scene.position.x = -18
  paredeImportada3.scene.position.y = -7
  paredeImportada3.scene.position.z = 0
  paredeImportada3.scene.rotateY(Math.PI/2)
  scene.add(paredeImportada3.scene)

  paredeImportada3.animations; // Array<THREE.AnimationClip>
  paredeImportada3.scene; // THREE.Group
  paredeImportada3.scenes; // Array<THREE.Group>
  paredeImportada3.cameras; // Array<THREE.Camera>
  paredeImportada3.asset; // Object
})
importer.load('./Objetos/wall_window/scene.gltf', function(paredeImportada4){
  mixerAnimacao = new THREE.AnimationMixer(paredeImportada4)
  
  paredeImportada4.scene.scale.x = 9
  paredeImportada4.scene.scale.y = 9
  paredeImportada4.scene.scale.z = 9
  paredeImportada4.scene.position.x = 18
  paredeImportada4.scene.position.y = -7
  paredeImportada4.scene.position.z = 0
  paredeImportada4.scene.rotateY(Math.PI/2)
  scene.add(paredeImportada4.scene)

  paredeImportada4.animations; // Array<THREE.AnimationClip>
  paredeImportada4.scene; // THREE.Group
  paredeImportada4.scenes; // Array<THREE.Group>
  paredeImportada4.cameras; // Array<THREE.Camera>
  paredeImportada4.asset; // Object
})

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

  controls = new PointerLockControls(cameraP, renderer.domElement);
  controls.addEventListener('lock', function(){

  });
  controls.addEventListener('unlock', function(){
  
  });
  
  document.addEventListener(
    'click',
    function() {
      controls.lock()
    },
    false
  )

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
  
  var texture_dir = new THREE.TextureLoader().load('./Skybox/indoors-skyboxes/DallasW/posx.jpg');
  var texture_esq = new THREE.TextureLoader().load('./Skybox/indoors-skyboxes/DallasW/negx.jpg');
  var texture_up = new THREE.TextureLoader().load('./Skybox/indoors-skyboxes/DallasW/posy.jpg');
  var texture_dn = new THREE.TextureLoader().load('./Skybox/indoors-skyboxes/DallasW/negy.jpg');
  var texture_bk = new THREE.TextureLoader().load('./Skybox/indoors-skyboxes/DallasW/posz.jpg');
  var texture_ft = new THREE.TextureLoader().load('./Skybox/indoors-skyboxes/DallasW/negz.jpg');

  var materialArray = [];

  materialArray.push(new THREE.MeshBasicMaterial({map:texture_dir}));
  materialArray.push(new THREE.MeshBasicMaterial({map:texture_esq}));
  materialArray.push(new THREE.MeshBasicMaterial({map:texture_up}));
  materialArray.push(new THREE.MeshBasicMaterial({map:texture_dn}));
  materialArray.push(new THREE.MeshBasicMaterial({map:texture_bk}));
  materialArray.push(new THREE.MeshBasicMaterial({map:texture_ft}));

  for (var i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
  }

  var skyboxGeo = new THREE.BoxGeometry(100,100,100);

  var skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);

  //peao amarelo
  var peaoGeometria = new THREE.ConeGeometry(0.5,1,10);
  var peao2Material = new THREE.MeshStandardMaterial({color: 0xCFAA45});
  var peao2= new THREE.Mesh(peaoGeometria, peao2Material);
  peao2.position.set(-5.5,0.4,5.5);
  peao2.name = "Jogador 2";
  // scene.add(carro);


  var texturaNeve = texturaLoader.load('./Imagens/textura_neve2.jpg');
  var texturaCenoura = texturaLoader.load('./Imagens/cenoura.jpg');
  var texturaPernas = texturaLoader.load('./Imagens/360_F_278776572_zH2spb9z2lYg0pvSi7dWjVvkCwZW9XPz.jpg')
  var texturaJanela = texturaLoader.load('./Imagens/vidro_janela.jpg')
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
  const bonecoNeveBaseMaterial = new THREE.MeshStandardMaterial({map:texturaNeve});
  var bonecoNeveBase = new THREE.Mesh(bonecoNeveBaseGeometria,bonecoNeveBaseMaterial);
  bonecoNeveBase.position.set(0,0.5,0);
  
  var janelaMaiorGeometria = new THREE.PlaneGeometry(20,8)
  var janelaMenorGeometria = new THREE.PlaneGeometry(13,8)
  var janelaMaterial = new THREE.MeshStandardMaterial({map:texturaJanela, side: THREE.DoubleSide})
  var janela1 = new THREE.Mesh(janelaMaiorGeometria, janelaMaterial)
  var janela2 = new THREE.Mesh(janelaMaiorGeometria, janelaMaterial)
  var janela3 = new THREE.Mesh(janelaMenorGeometria, janelaMaterial)
  var janela4 = new THREE.Mesh(janelaMenorGeometria, janelaMaterial)

  janela3.rotateY(Math.PI/2)
  janela4.rotateY(Math.PI/2)

  janela1.position.set(0,4.2,-11.5)
  janela2.position.set(0,4.2,12.5)
  janela3.position.set(18,4.5,0.5)
  janela4.position.set(-18,4.5,0.5)
  

  scene.add(janela1)
  scene.add(janela2)
  scene.add(janela3)
  scene.add(janela4)
  
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

  var pernaMesaGeometria = new THREE.CylinderGeometry(0.19,0.19,7.5)
  var pernaMesaMaterial = new THREE.MeshStandardMaterial({map:texturaPernas})
  var pernaMesa1 = new THREE.Mesh(pernaMesaGeometria,pernaMesaMaterial)
  var pernaMesa2 = new THREE.Mesh(pernaMesaGeometria,pernaMesaMaterial)
  var pernaMesa3 = new THREE.Mesh(pernaMesaGeometria,pernaMesaMaterial)
  var pernaMesa4 = new THREE.Mesh(pernaMesaGeometria,pernaMesaMaterial)
  
  pernaMesa1.position.set(-3.5,-4,-3.5)
  pernaMesa2.position.set(3.5,-4,-3.5)
  pernaMesa3.position.set(-3.5,-4,3.5)
  pernaMesa4.position.set(3.5,-4,3.5)

  scene.add(pernaMesa1)
  scene.add(pernaMesa2)
  scene.add(pernaMesa3)
  scene.add(pernaMesa4)



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



  

  orbitControls = new OrbitControls(activeCamera, renderer.domElement);
 
  orbitControls.target.set(0, 0, 0); //rodar em torno deste ponto
 
  orbitControls.enablePan = false; //Para que não seja possível mexer a camara lateralmente, apenas rodar em torno do ponto definido
  orbitControls.maxPolarAngle = Math.PI / 2; //restricts how far the camera can tilt up or down -> Math.PI / 2 (which is 90 degrees in radians)
 
  orbitControls.enableDamping = true; //transições mais suaves ao mexer a camara 

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
  MovePlayer();

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
  if(keyCode == 87)
  {
      controls.moveForward(0.5)
  }
  else if(keyCode == 83)
  {
      controls.moveForward(-0.5)
  }
  else if(keyCode == 65)
  {
      controls.moveRight(-0.5)
  }
  else if(keyCode == 68)
  {
      controls.moveRight(0.5)
  }
  
}

let step = 0;
let speed = 0.04;

function animate(){


  
  orbitControls.update();
  renderer.render(scene, activeCamera);
  requestAnimationFrame(animate);
}

//
function MovePlayer(player1, target){

  step += speed;
  var BonecoNeve = scene.getObjectByName('Boneco de neve');
  BonecoNeve.position.y = Math.abs(Math.sin(step));

  BonecoNeve.position.x += 0.013

  if( BonecoNeve.position.x < 1.5)
    {
      requestAnimationFrame(MovePlayer);
    }
  
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
      player1.position.x = player1.position.x + 1; //calcular target 
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




