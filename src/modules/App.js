import React, { Component } from 'react';
import Main from './Main/Main';
import About from './About/About';
import Work from './Work/Work';
import PreloaderMain from './PreloaderMain/PreloaderMain';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      loadWidth: 0,
    };

    this.resize = this.resize.bind(this);
  }

  componentDidMount(){
    window.addEventListener('load', () => {
      console.log('done')
    });
    if(!this.frameId){
      this.frameId = requestAnimationFrame(this.resize);
    }
  }
  
  componentWillUnmount(){
    cancelAnimationFrame(this.frameId);
  }

  resize(){
    this.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    this.height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    if (document.body.clientWidth !== this.width || document.body.clientHeight !== this.height) {
      this.setState((state, props) => ({width: this.width}));
    }
    this.frameId = window.requestAnimationFrame(this.resize);
  }

  workClick(){
    document.querySelector('section.main').className = 'main up';
    document.querySelector('section.work').className = 'work active';
    this.closeAboutClick();
  }

  closeWorkClick(){
    document.querySelector('section.main').className = 'main';
    document.querySelector('section.work').className = 'work';
  }

  aboutClick(){
    document.querySelector('section.main').className = 'main down';
    document.querySelector('section.about').className = 'about active';
    this.closeWorkClick();
  }

  closeAboutClick(){
    document.querySelector('section.main').className = 'main';
    document.querySelector('section.about').className = 'about';
  }

  setLoader(v){
    this.setState((state, props) => ({loadWidth: v * 0.8}));
  }

  setDoneLoading(){
    document.querySelector('.PreloaderMain').classList.add('unactive');
    setTimeout(() => {
      document.querySelector('.PreloaderMain').style = "display: none;";
    }, 1100);
  }

  render() {
    return (
      <>
        <Main aboutClick={this.aboutClick.bind(this)} workClick={this.workClick.bind(this)} widthL={this.state.width} setLoader={this.setLoader.bind(this)} setDoneLoading={this.setDoneLoading.bind(this)}/>
        <PreloaderMain widthLoad={this.state.loadWidth}/>
        <Work closeWorkClick={this.closeWorkClick.bind(this)} widthL={this.state.width} workClick={this.workClick.bind(this)} aboutClick={this.aboutClick.bind(this)}/>
        <About closeAboutClick={this.closeAboutClick.bind(this)} widthL={this.state.width}/>
      </>
    )
  }
}

export default App