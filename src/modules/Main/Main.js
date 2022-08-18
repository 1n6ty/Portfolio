import '../../static/css/Main/Main.css';

import Specs from '../Specs';

import React, { Component } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';

import island from '../../static/models/island.glb';
import envTexture from '../../static/textures/env.exr';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth
    };

    this.ang = {
      x: 0,
      y: 0,
      xt: 0,
      yt: 0,
      xRotFlag: false,
      yRotFlag: false
    };
    this.rendererSize = {
      w: window.innerWidth,
      h: window.innerHeight
    };
    this.mouse = {
      x: 0,
      y: 0
    }
  }

  componentWillReceiveProps(){
    this.setState((state, props) => ({width: props.widthL}));
  }

  workClick(){
    window.location.hash = '#work';
  }

  aboutClick(){
    window.location.hash = '#aboutMe';
  }

  mouseMoveHandler(e){
    if(Math.abs(e.clientX - this.mouse.x) > 100){
      this.mouse.x = e.clientX;
      let winXh = window.innerWidth * 0.5;
      this.ang.y = Math.floor(((this.mouse.x / winXh- 1) * 0.2 + 0.8) * 100) * 0.01;
      this.ang.yRotFlag = true;
    }
    if(Math.abs(e.clientY - this.mouse.y) > 100){
      this.mouse.y = e.clientY;
      let winYh = window.innerHeight * 0.5;
      this.ang.x = Math.floor(((this.mouse.y / winYh - 1) * 0.1 + 0.27) * 100) * 0.01;
      this.ang.xRotFlag = true;
    }
  }

  componentDidMount(){
    this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.set(0, 0, 53);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setClearColor('#B8DFEF');

    const GLTFloader = new GLTFLoader(),
          EXRloader = new EXRLoader();

    GLTFloader.load(island, 
      (obj) => {
        this.obj = obj.scene;
        this.obj.position.set(0, 0, 0);
        if(window.innerWidth < 550){
          this.obj.scale.set(0.55, 0.55, 0.55);
        } else{
          this.obj.scale.set(1, 1, 1);
        }
        this.obj.rotation.set(Math.PI / 12, Math.PI / 4, 0);

        this.scene.add(this.obj);

        this.renderer.render(this.scene, this.camera);
        this.props.popLoad();
      },
      undefined,
      (err) => {
        console.error(err);
      }
    );
    EXRloader.load(envTexture, 
      (texture, textureData) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.environment = texture;

        this.renderer.render(this.scene, this.camera);
        this.props.popLoad();
      },
      undefined,
      (err) => {
        console.error(err);
      }
    );

    this.mount.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate(){
    if(this.obj && this.ang.xRotFlag){
      this.ang.xt = Math.floor((this.ang.x - this.obj.rotation.x) * 400) / 10000;
      if(Math.abs(this.ang.xt) < 0.0001) this.ang.xRotFlag = false;
      this.obj.rotation.x += this.ang.xt;
    }
    if(this.obj && this.ang.yRotFlag){
      this.ang.yt = Math.floor((this.ang.y - this.obj.rotation.y) * 400) / 10000;
      if(Math.abs(this.ang.yt) < 0.0001) this.ang.yRotFlag = false;
      this.obj.rotation.y += this.ang.yt;
    }
    if(this.ang.yRotFlag || this.ang.xRotFlag) this.renderer.render(this.scene, this.camera);

    if(this.rendererSize.w != window.innerWidth || this.rendererSize.h != window.innerHeight){
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.rendererSize.w = window.innerWidth;
      this.rendererSize.h = window.innerHeight;
      this.renderer.setSize(this.rendererSize.w, this.rendererSize.h);

      if(window.innerWidth < 550){
        this.obj.scale.set(0.55, 0.55, 0.55);
      } else{
        this.obj.scale.set(1, 1, 1);
      }

      this.renderer.render(this.scene, this.camera);
    }

    setTimeout(this.animate.bind(this), 16);
  }

  render() {
    return (
      <section className='main' style={{display: 'none'}} onMouseMove={this.mouseMoveHandler.bind(this)}>
        <Specs widthL={this.state.width}/>
        <div
          ref={(mount) => { this.mount = mount }} 
        />
        <a className='upTrigger' onClick={this.aboutClick.bind(this)}>
          <span>About me</span>
        </a>
        <a className='downTrigger' onClick={this.workClick.bind(this)}>
          <span>Work</span>
        </a>
      </section>
    )
  }
}

export default Main