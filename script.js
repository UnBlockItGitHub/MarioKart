// Import Three.js
import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Car setup
const carGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const carMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);
car.position.set(0, 0.25, -5);

// Track setup
const trackGeometry = new THREE.PlaneGeometry(100, 100);
const trackMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const track = new THREE.Mesh(trackGeometry, trackMaterial);
track.rotation.x = -Math.PI / 2;
scene.add(track);

// Camera positioning
camera.position.z = 5;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Controls
const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp': controls.forward = true; break;
        case 'ArrowDown': controls.backward = true; break;
        case 'ArrowLeft': controls.left = true; break;
        case 'ArrowRight': controls.right = true; break;
    }
});

document.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'ArrowUp': controls.forward = false; break;
        case 'ArrowDown': controls.backward = false; break;
        case 'ArrowLeft': controls.left = false; break;
        case 'ArrowRight': controls.right = false; break;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Car movement
    if (controls.forward) car.position.z -= 0.05;
    if (controls.backward) car.position.z += 0.05;
    if (controls.left) car.rotation.y += 0.05;
    if (controls.right) car.rotation.y -= 0.05;

    renderer.render(scene, camera);
}

animate();
