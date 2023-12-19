import * as Three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// Set up scene
const scene = new Three.Scene();

// Set up Perspective camera
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 35;
camera.position.y = 35;
camera.position.x = -36;

const renderer = new Three.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//Init the world
const matStars = new Three.MeshBasicMaterial({map: new Three.TextureLoader().load("Assets/stars.jpeg"), side: Three.BackSide});
const geoStars = new Three.SphereGeometry(2000);
const stars = "Assets/stars4.jpg";
//const textureStars = new Three.TextureLoader().load("Assets/stars4.jpg");
scene.background = new Three.CubeTextureLoader().load([stars,stars,stars,stars,stars,stars]);
const planeGeometry = new Three.PlaneGeometry(100,100);
const sunGeometry = new Three.SphereGeometry(25, 20, 20);
const sunMaterial = new Three.MeshStandardMaterial({map: new Three.TextureLoader().load("Assets/sun.jpg")});

const geoRing = new Three.RingGeometry(9,14);
const matRing = new Three.MeshStandardMaterial({map:new Three.TextureLoader().load("Assets/saturnRing3.jpg"),side: Three.DoubleSide});

/*
var matRing = new Three.ShaderMaterial({
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    
    void main() {
      float ringColor = smoothstep(0.25, 0.3, mod(length(vUv - 0.5), 1.0));
      gl_FragColor = vec4(vec3(ringColor), 1.0);
    }
  `
});
*/




const meshRing = new Three.Mesh(geoRing, matRing);
const meshStars = new Three.Mesh(geoStars,matStars);
meshRing.rotation.x = -0.5*Math.PI;
const colorMaterial = new Three.MeshStandardMaterial({color: 0xFFFFFF});
const plane = new Three.Mesh(planeGeometry,colorMaterial);
plane.receiveShadow = true;

const sun = new Three.Mesh(sunGeometry,sunMaterial);
sun.position.add(new Three.Vector3(0, 0, 0));
scene.add(sun);
//scene.add(meshStars);


// Add Objects to the scene
//const geometry = new Three.BoxGeometry();
/*
const earthGeometry = new Three.SphereGeometry(5, 20, 20);
const moonGeometry = new Three.SphereGeometry(1, 20, 20);
const sunGeometry = new Three.SphereGeometry(10, 20, 20);
const jupiterGeometry = new Three.SphereGeometry(8, 20, 20);
const marsGeometry = new Three.SphereGeometry(3, 20, 20);
const titanGeometry = new Three.SphereGeometry(8, 20, 20);
const uranusGeometry = new Three.SphereGeometry(6, 20, 20);


//const material = new Three.MeshBasicMaterial({ color: 0x840255 });
//const circleMaterial = new Three.MeshStandardMaterial({color: 0xFFFF00})
const earthMaterial = new Three.MeshStandardMaterial({map:  new Three.TextureLoader().load("Assets/earth.jpeg")});
const moonMaterial = new Three.MeshStandardMaterial({map: new Three.TextureLoader().load("Assets/moon.jpg")});
const sunMaterial = new Three.MeshStandardMaterial({map: new Three.TextureLoader().load("Assets/sun.jpg")});
const jupiterMaterial = new Three.MeshStandardMaterial({map: new Three.TextureLoader().load("Assets/jupiter.png")});
const marsMaterial = new Three.MeshStandardMaterial({map: new Three.TextureLoader().load("Assets/mars.jpg")});
const titanMaterial = new Three.MeshStandardMaterial({map: new Three.TextureLoader().load("Assets/titan.png")});
const uranusMaterial = new Three.MeshBasicMaterial({map: new Three.TextureLoader().load("Assets/uranus.png")});
*/

//const capsuleGeometry = new Three.TorusGeometry();
//const capsuleMaterial  = new Three.MeshStandardMaterial({color:0x262677/*, wireframe:true*/});
//const capsuleObject =  new Three.Mesh(capsuleGeometry, capsuleMaterial);
///const cube = new Three.Mesh(geometry, material);
//scene.add(cube); 
//scene.add(capsuleObject);
//Texture Mapping
/*const earth = new Three.Mesh(earthGeometry, earthMaterial);
const moon = new Three.Mesh(moonGeometry, moonMaterial);
const moon2 = new Three.Mesh(moonGeometry, moonMaterial);
const sun = new Three.Mesh(sunGeometry,sunMaterial);
const jupiter = new Three.Mesh(jupiterGeometry, jupiterMaterial);
const mars = new Three.Mesh(marsGeometry, marsMaterial);
const titan = new Three.Mesh(titanGeometry, titanMaterial);
const uranus = new Three.Mesh(uranusGeometry, uranusMaterial);


earth.position.add(new Three.Vector3(3,7,0));
moon.position.add(new Three.Vector3(11,9,0));
moon2.position.add(new Three.Vector3(-9,20,3));
sun.position.add(new Three.Vector3(-22, 19, -17));
jupiter.position.add(new Three.Vector3(65, 9, -17));
mars.position.add(new Three.Vector3(30, 8, -17));
//plane.position.add(new Three.Vector3(30, 8, -17));

plane.rotation.x = -0.5*Math.PI;
//uranus.position.add(new Three.Vector3(-22, 19, -17));
plane.receiveShadow = true;
earth.castShadow = true;

scene.add(earth);
scene.add(moon);
scene.add(moon2);
;
scene.add(jupiter);
scene.add(mars);
scene.add(plane);*/

//Light
const dirLight = new Three.DirectionalLight(0xFFFFFF,0.9)
dirLight.position.add(new Three.Vector3(16,20,0));
dirLight.castShadow = true;
dirLight.shadow.camera.top= 10;
//const dirLightHelper = new Three.DirectionalLightHelper(dirLight,10);
//const cameraHelper = new Three.CameraHelper(dirLight.shadow.camera);
//scene.add(dirLightHelper);
//scene.add(cameraHelper);

//scene.add(titan);;
//scene.add(uranus);;
const sunWorldPos = new Three.Vector3();
sun.getWorldPosition(sunWorldPos);
function vecMinus(vec1: Three.Vector3, vec2: Three.Vector3): Three.Vector3{
  return new Three.Vector3(vec1.x- vec2.x, vec1.y - vec2.y,vec1.z - vec2.z);
}

function addNewPlanet(loci: Three.Mesh, radius: any, pos: Three.Vector3, texturePlanet: Three.Texture): any {

  const orbital = new Three.Object3D();
  orbital.position.add(sunWorldPos);
  const geoPlanet = new Three.SphereGeometry(radius, 15, 15);
  const matPlanet = new Three.MeshStandardMaterial({map: texturePlanet});
  const meshPlanet = new Three.Mesh(geoPlanet,matPlanet);
  meshPlanet.position.add(pos);

  orbital.add(meshPlanet)
  scene.add(orbital);
  return {meshPlanet,orbital}; 
}


const earth = addNewPlanet(sun,5,new Three.Vector3(93,7,0),  new Three.TextureLoader().load("Assets/earth.jpeg"));
const moon = addNewPlanet(sun, 2, new Three.Vector3(101,9,0),  new Three.TextureLoader().load("Assets/moon.jpg"));
//const moon2 = addNewPlanet(sun, 2, new Three.Vector3(81,20,3),  new Three.TextureLoader().load("Assets/moon.jpg"));
const venus = addNewPlanet(sun,4,new Three.Vector3(43,7,0),  new Three.TextureLoader().load("Assets/venus3.jpg"));
const mercury = addNewPlanet(sun,4,new Three.Vector3(73,7,0),  new Three.TextureLoader().load("Assets/mercury.jpg"));
const saturn = addNewPlanet(sun,7,new Three.Vector3(205,7,0),  new Three.TextureLoader().load("Assets/saturn.jpg"));
const uranus = addNewPlanet(sun,6, new Three.Vector3(245, 9, -17),  new Three.TextureLoader().load("Assets/uranus.png"));
const jupiter = addNewPlanet(sun, 10, new Three.Vector3(155, 9, -17),  new Three.TextureLoader().load("Assets/jupiter.png"));
const mars = addNewPlanet(sun, 3, new Three.Vector3(120, 8, -17),  new Three.TextureLoader().load("Assets/mars.jpg"));
saturn.meshPlanet.add(meshRing);


//const titan = addNewPlanet(5, new Three.Vector3(3,7,0),  new Three.TextureLoader().load("Assets/titan.png"))



// Add lights
const ambientLight = new Three.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
scene.add(dirLight);

const pointLight = new Three.PointLight(0xffffff, 60);
pointLight.position.set(5, 5,5);
//scene.add(pointLight);
const gridHelper = new Three.GridHelper(80,100);
//scene.add(gridHelper);
//scene.add(pointLightHelper);
const controls = new OrbitControls(camera,renderer.domElement);
// Animation
//scene.fog = new Three.Fog(0x00ff00,100, 300);
//renderer.setClearColor(0x0000FF);

const animate = function () {
  requestAnimationFrame(animate);

  if (earth.meshPlanet) {
    venus.orbital.rotation.y += 0.007;
    mercury.orbital.rotation.y += 0.004;

    earth.meshPlanet.rotation.y  += 0.01;
    earth.orbital.rotation.y  += 0.003;
    moon.orbital.rotation.y  += 0.003;
  //  moon2.orbital.rotation.y  += 0.003;
    mars.orbital.rotation.y += 0.001;
    jupiter.orbital.rotation.y += 0.0001;
    
    saturn.orbital.rotation.y += 0.00002;
    uranus.orbital.rotation.y += 0.000004;

  }
  sun.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


animate();