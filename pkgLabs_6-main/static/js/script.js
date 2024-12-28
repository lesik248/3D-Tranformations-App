// Создание основной сцены
const scene = new THREE.Scene();

// Установка перспективной камеры
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Создание WebGL-рендерера
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Добавление управления камерой (вращение, зум и панорама)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Включение сетки на основной сцене
const gridHelper = new THREE.GridHelper(10, 10, '#8E8D8A', '#8E8D8A');
scene.add(gridHelper);

// Загрузка шрифта и создание текста
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    // Создание геометрии текста
    const textGeometry = new THREE.TextGeometry('Y', {
        font: font,
        size: 1.5,
        height: 0.3,
    });

    // Создание проволочного каркаса для текста
    const wireframeGeometry = new THREE.WireframeGeometry(textGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: '#FF0000' });
    const letter= new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    scene.add(letter);

    // Центрирование текста
    textGeometry.computeBoundingBox();
    const centerOffset = new THREE.Vector3();
    textGeometry.boundingBox.getCenter(centerOffset).multiplyScalar(-1);
    letter.position.set(centerOffset.x, centerOffset.y, centerOffset.z);

    const transformControls = {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        positionX: 0,
        positionY: 0,
        positionZ: 0
    };

    const gui = new dat.GUI();
    gui.domElement.id = 'gui';
    const rotationFolder = gui.addFolder('Rotation');
    rotationFolder.add(transformControls, 'rotationX', -Math.PI, Math.PI).name('X Axis').onChange(updateTransform);
    rotationFolder.add(transformControls, 'rotationY', -Math.PI, Math.PI).name('Y Axis').onChange(updateTransform);
    rotationFolder.add(transformControls, 'rotationZ', -Math.PI, Math.PI).name('Z Axis').onChange(updateTransform);

    const scaleFolder = gui.addFolder('Scale');
    scaleFolder.add(transformControls, 'scaleX', 0.1, 3).name('X Scale').onChange(updateTransform);
    scaleFolder.add(transformControls, 'scaleY', 0.1, 3).name('Y Scale').onChange(updateTransform);
    scaleFolder.add(transformControls, 'scaleZ', 0.1, 3).name('Z Scale').onChange(updateTransform);

    const positionFolder = gui.addFolder('Position');
    positionFolder.add(transformControls, 'positionX', -5, 5).name('X Position').onChange(updateTransform);
    positionFolder.add(transformControls, 'positionY', -5, 5).name('Y Position').onChange(updateTransform);
    positionFolder.add(transformControls, 'positionZ', -5, 5).name('Z Position').onChange(updateTransform);

    rotationFolder.open();
    scaleFolder.open();
    positionFolder.open();

    function updateTransform() {
        letter.rotation.set(
            transformControls.rotationX,
            transformControls.rotationY,
            transformControls.rotationZ
        );
        letter.scale.set(
            transformControls.scaleX,
            transformControls.scaleY,
            transformControls.scaleZ
        );
        letter.position.set(
            transformControls.positionX + centerOffset.x,
            transformControls.positionY + centerOffset.y,
            transformControls.positionZ + centerOffset.z
        );

        const matrix = letter.matrix.elements.map(value => value.toFixed(2));
        document.getElementById('matrixDisplay').innerHTML =
            'Transformation Matrix:<br>' +
            matrix.slice(0, 4).join(' ') + '<br>' +
            matrix.slice(4, 8).join(' ') + '<br>' +
            matrix.slice(8, 12).join(' ') + '<br>' +
            matrix.slice(12, 16).join(' ');
    }
});

const ambientLight = new THREE.AmbientLight('#8E8D8A', 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#EAE7DC', 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function createAxisLabel(text, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 32;
    context.fillStyle = '#2C3531';
    context.font = 'bold 24px Arial';
    context.fillText(text, 0, 24);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    sprite.scale.set(0.5, 0.25, 1);
    return sprite;
}


const xLabel = createAxisLabel('X', new THREE.Vector3(5.5, 0, 0), '#FF0000'); // Красный цвет
const yLabel = createAxisLabel('Y', new THREE.Vector3(0, 5.5, 0), '#00FF00'); // Зелёный цвет
const zLabel = createAxisLabel('Z', new THREE.Vector3(0, 0, 5.5), '#0000FF'); // Синий цвет
scene.add(xLabel);
scene.add(yLabel);
scene.add(zLabel);

const topCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000);
const frontCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000);
const sideCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000);

topCamera.position.set(0, 10, 0);
frontCamera.position.set(0, 0, 10);
sideCamera.position.set(10, 0, 0);

topCamera.lookAt(0, 0, 0);
frontCamera.lookAt(0, 0, 0);
sideCamera.lookAt(0, 0, 0);

// Рендереры для проекций
const topRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const frontRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const sideRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

topRenderer.setSize(200, 200);
frontRenderer.setSize(200, 200);
sideRenderer.setSize(200, 200);

const projectionScene = new THREE.Scene();
projectionScene.add(new THREE.AmbientLight('#8E8D8A', 0.6));
projectionScene.add(new THREE.DirectionalLight('#EAE7DC', 0.8));
projectionScene.background = new THREE.Color('#D8C3A5');

// Проекционные виды
document.getElementById('topView').appendChild(topRenderer.domElement);
document.getElementById('frontView').appendChild(frontRenderer.domElement);
document.getElementById('sideView').appendChild(sideRenderer.domElement);

// Камера основной сцены
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    topRenderer.render(scene, topCamera);
    frontRenderer.render(scene, frontCamera);
    sideRenderer.render(scene, sideCamera);
}

animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
