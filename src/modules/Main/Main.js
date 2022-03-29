import '../../static/css/Main/Main.css';

import Specs from '../Specs';

import React, { Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import car from '../../static/models/main/car.gltf';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth
    };

    this.keys = {};
    this.animate = this.animate.bind(this);
    this.lookAtVector = [0, 0, 0];
    this.cameraPositionVector = [2, 4, 5];
  }

  componentWillReceiveProps(){
    this.setState((state, props) => ({width: props.widthL}));
  }

  resizeCanvas() {
    this.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    this.height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  }

  componentDidMount(){
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

    

    

    const loader = new GLTFLoader();

    loader.load(car,
                (obj) => {
                  this.mainObj = obj.scene;
                  this.mainObj.position.y = 1;
                  this.mainObj.scale.set(0.1, 0.1, 0.1);
                  this.scene.add(this.mainObj);
                  this.props.setDoneLoading();
                  if (!this.frameId) {
                    this.frameId = requestAnimationFrame(this.animate);
                  }
                },
                (xhr) => {
                  console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
                },
                function ( error ) {
                  console.error( error );
                });


    const light = new THREE.PointLight( 0xffffff, 1.7, 1000 );
    light.castShadow = true;
    light.position.set( 30, 50, 50 );
    this.scene.add( light );

    window.addEventListener('keydown', (event) => {
      this.keys[event.key] = true;
   });
   
   window.addEventListener('keyup', (event) => {
      delete this.keys[event.key];
   });

    this.mount.appendChild(this.renderer.domElement);
  }

  animate() {
    this.resizeCanvas();

    const canvas = this.renderer.domElement;
    if (canvas.clientWidth !== this.width || canvas.clientHeight !== this.height) {
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    }

    let step = 0.04;
    if(this.keys['s']){
      this.mainObj.position.z += step;
      this.cameraPositionVector[2] += step;
      this.lookAtVector[2] += step;
      this.mainObj.rotation.y = 0;
      if(this.keys['a']){
        this.mainObj.position.x -= step;
        this.cameraPositionVector[0] -= step;
        this.lookAtVector[0] -= step;
        this.mainObj.rotation.y = 7 * Math.PI / 4;
      } else if(this.keys['d']){
        this.mainObj.position.x += step;
        this.cameraPositionVector[0] += step;
        this.lookAtVector[0] += step;
        this.mainObj.rotation.y = Math.PI / 4;
      }
    } else if(this.keys['w']){
      this.mainObj.position.z -= step;
      this.cameraPositionVector[2] -= step;
      this.lookAtVector[2] -= step;
      this.mainObj.rotation.y = Math.PI;
      if(this.keys['a']){
        this.mainObj.position.x -= step;
        this.cameraPositionVector[0] -= step;
        this.lookAtVector[0] -= step;
        this.mainObj.rotation.y = 5 * Math.PI / 4;
      } else if(this.keys['d']){
        this.mainObj.position.x += step;
        this.cameraPositionVector[0] += step;
        this.lookAtVector[0] += step;
        this.mainObj.rotation.y = 3 * Math.PI / 4;
      }
    } else if(this.keys['a']){
      this.mainObj.position.x -= step;
      this.cameraPositionVector[0] -= step;
      this.lookAtVector[0] -= step;
      this.mainObj.rotation.y = 3 * Math.PI / 2;
    } else if(this.keys['d']){
      this.mainObj.position.x += step;
      this.cameraPositionVector[0] += step;
      this.lookAtVector[0] += step;
      this.mainObj.rotation.y = Math.PI / 2;
    }
    this.camera.position.set(...this.cameraPositionVector);
    this.camera.lookAt(...this.lookAtVector);



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
        <a className='upTrigger' onClick={this.props.aboutClick}>About me</a>
        <a className='downTrigger' onClick={this.props.workClick}>Work</a>
      </section>
    )
  }
}

export default Main