document.addEventListener('DOMContentLoaded', Start);

const renderer = new THREE.WebGLRenderer();
//janela
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

const cena = new THREE.Scene();

//Camaras 
//Ortográfica
const CamaraOrtografica = new THREE.OrthographicCamera(
    -1,     //left
    1,      //right 
    1,      //top
    -1,     //bottom
    -10,    //near plane    
    10      //far plane
);

//Perspetiva 
const CamaraPerspetiva = new THREE.PerspectiveCamera(
    75,                                                     //fov
    window.innerWidth/window.innerHeight,                   //aspect ratio
     0.1,                                                   //near plane
     1000);                                                 //far plane 


const AxesHelper = new THREE.AxesHelper(5);

var texturaMesa = new THREE.TextureLoader().load('./Imagens/madeira.jpg');

var gemoetriaCubo = new THREE.BoxGeometry(20,1,20);
var materialCubo = new THREE.MeshBasicMaterial({map:texturaMesa});
var mesa = new THREE.Mesh(gemoetriaCubo,materialCubo);
mesa.position.set(0,-1,0);

CamaraPerspetiva.position.set(0,10,28); 
//controls.update();

//const controls = new OrbitControls(CamaraPerspetiva, renderer.domElement);


function Start()
{
    cena.add(AxesHelper);
    cena.add(mesa);
    renderer.render(cena, CamaraPerspetiva);
}
