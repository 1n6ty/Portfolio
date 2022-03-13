import '../../static/css/Main/Main.css';

import Specs from '../Specs';

import React, { Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import chr from '../../static/models/main/main.gltf';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth
    };

    this.keys = {};
    this.animate = this.animate.bind(this);
    this.lookAtVector = [0, 0, 0];
    this.cameraPositionVector = [2, 2, 5];
  }

  componentWillReceiveProps(){
    this.setState((state, props) => ({width: props.widthL}));
  }

  resizeCanvas() {
    this.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    this.height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  }

  componentDidMount() {
    this.resizeCanvas();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#E4E4E4');
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.set(...this.cameraPositionVector);
    this.camera.lookAt(...this.lookAtVector);

    

      const ground = new THREE.PlaneGeometry(10, 10);
      const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
      const groundMesh = new THREE.Mesh(ground, material);

      groundMesh.rotateX(-Math.PI / 2);
      this.scene.add(groundMesh);

    const loader = new GLTFLoader();
    loader.load(chr,
                (obj) => {
                  this.mainObj = obj;
                  this.mainObj.scene.scale.set(0.1, 0.1, 0.1);
                  this.mainObj.scene.position.y = 1;
                  this.scene.add(this.mainObj.scene);
                  this.props.setDoneLoading();
                },
                (xhr) => {
                  console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
                },
                function ( error ) {
                  console.error( error );
                });


    const light = new THREE.PointLight( 0xffffff, 1, 600 );
    light.castShadow = true;
    light.position.set( 30, 50, 50 );
    this.scene.add( light );

    window.addEventListener('keydown', (event) => {
      this.keys[event.key] = true;
   
      if(this.keys['s']){
        this.mainObj.scene.position.z += 1;
        this.cameraPositionVector[2] += 1;
        this.lookAtVector[2] += 1;
      }
      if(this.keys['w']){
        this.mainObj.scene.position.z -= 1;
        this.cameraPositionVector[2] -= 1;
        this.lookAtVector[2] -= 1;
      }
      if(this.keys['a']){
        this.mainObj.scene.position.x -= 1;
        this.cameraPositionVector[0] -= 1;
        this.lookAtVector[0] -= 1;
      }
      if(this.keys['d']){
        this.mainObj.scene.position.x += 1;
        this.cameraPositionVector[0] += 1;
        this.lookAtVector[0] += 1;
      }
      this.camera.position.set(...this.cameraPositionVector);
      this.camera.lookAt(...this.lookAtVector);
   });
   
   window.addEventListener('keyup', (event) => {
      delete this.keys[event.key];
   });

    this.mount.appendChild(this.renderer.domElement)
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  animate() {
    this.resizeCanvas();

    const canvas = this.renderer.domElement;
    if (canvas.clientWidth !== this.width || canvas.clientHeight !== this.height) {
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }

  render() {
    return (
      <section className='main'>
        <Specs widthL={this.state.width}/>
        <div
          ref={(mount) => { this.mount = mount }} 
        />
        <a className='upTrigger' style={{left: (this.props.widthL - 20) / 2}} onClick={this.props.aboutClick}><span>About me</span></a>
        <a className='downTrigger' style={{left: (this.props.widthL - 20) / 2}} onClick={this.props.workClick}><span>Work</span></a>
      </section>
    )
  }
}

export default Main