
//globals

var scene, camera, renderer, cubeObj, orbitControls;
var objects = [];

init();
animate();


function init(){

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.x = 320;
	camera.position.z = 300;  // rotates on right / left side
	camera.position.y = 300; 
	

	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 100, 1000, 100 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;

	scene.add( spotLight );
	
	var light = new THREE.AmbientLight( 0xffffff ); // soft white light
	scene.add( light );
	
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	scene.add( directionalLight );
	
    renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	
	orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
	
	var dragControls = new THREE.DragControls(objects, camera,
			renderer.domElement);
	dragControls.addEventListener('dragstart', function() {
		orbitControls.enabled = true;
	});
	dragControls.addEventListener('dragend', function() {
		orbitControls.enabled = true;
	});
	
	loadSedan();
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xcce0ff);
	
	document.body.appendChild(renderer.domElement);

	}
	
	
	// sedan car is loaded here
	// https://satheeshks10.github.io/Three.js-basic3DObjCarModel/resources/script/mainScript.js
	function loadSedan(){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setTexturePath('Three.js-basic3DObjCarModel/resources/carModel/sedan/');
	mtlLoader.setPath('Three.js-basic3DObjCarModel/resources/carModel/sedan/');
	mtlLoader.load('sedan.mtl', function(materials) {

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('Three.js-basic3DObjCarModel/resources/carModel/sedan/');
			objLoader.load('sedan.obj', function(sedan) {
				    sedan.scale.y = sedan.scale.x = sedan.scale.z = 50;
			    	//position values
					sedan.position.y = 1.5; // green
					sedan.position.z = -10; // blue
					sedan.position.x = -10; // red
			   
				scene.add(sedan);

			});

		});
}


	function animate(){
		orbitControls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	}
