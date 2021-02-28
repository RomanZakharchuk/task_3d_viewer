let scene;
let camera;
let renderer;

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf7f7f7);

  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 10);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  document.body.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x505050, 4);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0x424242, 1);
  light.position.set(0, 2, 2);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  scene.add(light);

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10),
    new THREE.MeshPhongMaterial({ color: 0x777777, flatShading: true }));
  mesh.rotation.x = - Math.PI / 2;
  mesh.position.y = -1.3;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const controls = new THREE.OrbitControls(camera, render.domElement);
  controls.update();

  const loader = new THREE.GLTFLoader();
  loader.load('./skullGLTF/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
  });

  function animate() {
    render();
    requestAnimationFrame(animate);
    controls.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  render();
  animate();

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);
}

init();