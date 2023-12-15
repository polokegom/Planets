import * as Three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// Set up scene
const scene = new Three.Scene();

// Set up camera
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 35;
camera.position.y = 35;
camera.position.x = -36;
//scamera.rotateX( 90);

// Set up renderer
const renderer = new Three.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//Planet Texture

const earthTexture = new Three.TextureLoader().load("Assets/earth.jpeg");
const moonTexture = new Three.TextureLoader().load("Assets/moon.jpg");
const sunTexture = new Three.TextureLoader().load("Assets/sun.jpg");

// Add Objects to the scene
//const geometry = new Three.BoxGeometry();
const earthGeometry = new Three.SphereGeometry(5, 60, 60);
const moonGeometry = new Three.SphereGeometry(1, 20, 20);
const sunGeometry = new Three.SphereGeometry(10, 60, 60);

//const material = new Three.MeshBasicMaterial({ color: 0x840255 });
//const circleMaterial = new Three.MeshStandardMaterial({color: 0xFFFF00})
const earthMaterial = new Three.MeshStandardMaterial({map: earthTexture});
const moonMaterial = new Three.MeshStandardMaterial({map: moonTexture});
const sunMaterial = new Three.MeshStandardMaterial({map: sunTexture});

//const capsuleGeometry = new Three.TorusGeometry();
//const capsuleMaterial  = new Three.MeshStandardMaterial({color:0x262677/*, wireframe:true*/});
//const capsuleObject =  new Three.Mesh(capsuleGeometry, capsuleMaterial);
///const cube = new Three.Mesh(geometry, material);
//scene.add(cube); 
//scene.add(capsuleObject);
//Texture Mapping
const earth = new Three.Mesh(earthGeometry, earthMaterial);
const moon = new Three.Mesh(moonGeometry, moonMaterial);
const moon2 = new Three.Mesh(moonGeometry, moonMaterial);
const sun = new Three.Mesh(sunGeometry,sunMaterial);


earth.position.add(new Three.Vector3(3,7,0));
moon.position.add(new Three.Vector3(11,9,0));
moon2.position.add(new Three.Vector3(-9,20,3));
sun.position.add(new Three.Vector3(-22, 19, -17));

scene.add(earth);
scene.add(moon);
scene.add(moon2);
scene.add(sun);;



// Add lights
const ambientLight = new Three.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new Three.PointLight(0xffffff, 60);
pointLight.position.set(5, 5,5);
//scene.add(pointLight);
const gridHelper = new Three.GridHelper(40,100);
scene.add(gridHelper);
//scene.add(pointLightHelper);
const controls = new OrbitControls(camera,renderer.domElement);
// Animation
scene.fog = new Three.Fog(0x00ff00,100, 300);
//renderer.setClearColor(0x0000FF);

const animate = function () {
  requestAnimationFrame(animate);

  // Rotate the cube
  /**/if (earth) {
    earth.rotation.y  += 0.01;
    //sphereObject.rotation.y += 0.01;
    //sphereObject.rotation.z += 0.01;
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

// Start animation
animate();