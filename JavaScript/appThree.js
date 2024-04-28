document.addEventListener('DOMContentLoaded', Start);

var cena = new THREE.Scene();
var CamaraOrtografica = new THREE.OrthographicCamera(-1,1,1,-1,-10,10);
var CamaraPerspetiva = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000);
var renderer = new THREE.WebGLRenderer();
var materialTextura = new THREE.MeshBasicMaterial( { map:textura } );
 

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa);

document.body.appendChild(renderer.domElement);

const quadrado = new THREE.BoxGeometry(1,0.1,1); //qudrados tem 1 de largura (x), 0.1 de altura (y) e 1 de profundidade (z)
const quadradoVerde = new THREE.MeshBasicMaterial({color:0x66CDAA});
const quadradoBranco = new THREE.MeshBasicMaterial({color:0xF8F8FF});

var geometria = new THREE.BufferGeometry();

var texturaLoader = new THREE.TextureLoader();

const tabuleiro = new THREE.Group(); // Tabuleiro resultante é 10x10 em coordenadas U-V

//loop para criar o tabuleiro com os quadrados criados

for (let x=0; x<10; x++) //linhas 
{
    for(let z=0; z <10; z++) //colunas 
    {
        let cubo;
        if (z % 2 == 0) // se estivermos numa coluna par 
        {
            //Se estivermos numa linha par cubo passa a ser um quadrado branco, caso contrário passa a ser um quadrado verde
            cubo = new THREE.Mesh(quadrado, x % 2 == 0? quadradoBranco: quadradoVerde);
        }
        else // se estivermos numa coluna impar 
        {
            //Se estivermos numa linha par cubo passa a ser um quadrado verde, caso contrário passa a ser um quadrado branco
            cubo = new THREE.Mesh(quadrado, x % 2 == 0? quadradoVerde: quadradoBranco);
        }

        //Definir a posição do quadrado guardado em cubo
        cubo.position.set(x,0,z); 
        //Adicionar o quadrado guardado em cubo a tabuleiro
        tabuleiro.add(cubo);
    }
}

var meshTabuleiro = new THREE.Mesh(geometriaTabuleiro, materialTextura);
var geometriaTabuleiro = new THREE.BoxBufferGeometry(1,1,1);

//Primeiro, carregar a textura
var textura = new THREE.TextureLoader().load('./Imagens/snakesladdersCORTADA.jpg');




var uvAttribute = geometriaTabuleiro.getAttribute('uv');

uvAttribute.setXY(0,0,0)
uvAttribute.setXY(1,0,10)
uvAttribute.setXY(2,10,0)
uvAttribute.setXY(3,10,10)

CamaraPerspetiva.position.set(-2,7,0);
CamaraPerspetiva.lookAt(1.5,2,0);

function Start()
{
    cena.add(tabuleiro);
    cena.add(CamaraPerspetiva); // Adicionando a câmera perspectiva à cena
    renderer.render(cena, CamaraPerspetiva);
    requestAnimationFrame(loop);
}

function loop()
{
    renderer.render (cena, CamaraPerspetiva);
    requestAnimationFrame(loop);

}