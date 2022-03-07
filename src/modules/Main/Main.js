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

    this.animate = this.animate.bind(this);
    this.mouseX = 0;
    this.mouseY = 0;
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
    this.camera.position.z = 50;
    this.camera.position.y = 0;
    this.camera.position.x = 0;
    this.camera.rotation.y = 0;
    this.camera.rotation.x = 0;

    

      const ground = new THREE.PlaneGeometry(10, 10);
      const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
      const mesh = new THREE.Mesh(ground, material);
      //this.scene.add(mesh);

    this.props.setDoneLoading();

    const loader = new GLTFLoader();
    console.log(chr);
    loader.load(chr,
                (obj) => {
                  obj.scene.children[0].scale.set(4, 4, 4);
                  new THREE.Box3().setFromObject( obj.scene.children[0] ).getCenter( obj.scene.children[0].position ).multiplyScalar( - 1 )
                  let pivot = new THREE.Object3D();
                  pivot.add(obj.scene);
                  this.obj = pivot;
                  this.scene.add( pivot );
                  this.props.setDoneLoading();
                },
                (xhr) => {
                  console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
                },
                function ( error ) {
                  console.error( error );
                });


    const light = new THREE.PointLight( 0x46dff0, 1, 600 );
    light.castShadow = true;
    light.position.set( 30, 50, 50 );
    this.scene.add( light );

    window.addEventListener('mousemove', (e) => {
      e.preventDefault();
      this.mouseX = ((e.clientX / window.innerWidth) * 2 - 1) * Math.PI / 2;
      this.mouseY = (-(e.clientY / window.innerHeight) * 2 + 1) * Math.PI / 2;
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
    
    if(this.obj){
        this.obj.rotation.x += (-this.mouseY - parseInt(this.obj.rotation.x * 100) * 0.04) * 0.01;
        this.obj.rotation.y += (this.mouseX - parseInt(this.obj.rotation.y * 100) * 0.04) * 0.01
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