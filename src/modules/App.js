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
      hash: window.location.hash,
      load: 6
    };
  }

  componentDidMount(){
    window.addEventListener('hashchange', (e) => {
      this.setState((state, props) => ({hash: window.location.hash}));
    });
    this.popLoad();
  }

  popLoad(){
    this.setState((state, props) => ({load: state.load - 1}), () => {
      if(this.state.load <= 0) this.setDoneLoading();
    });
  }

  setDoneLoading(){
    window.addEventListener('resize', () => {
      this.setState((state, props) => ({width: window.innerWidth}));
      document.querySelector('section.about').style = 'transition: none;';
      document.querySelector('section.work').style = 'transition: none;';
      setTimeout(() => {
        document.querySelector('section.about').style = '';
        document.querySelector('section.work').style = '';
      }, 10);
    })
    document.querySelector('section.main').style = '';
    document.querySelector('section.about').style = '';
    document.querySelector('section.work').style = '';
    document.querySelector('.PreloaderMain').classList.add('unactive');
    setTimeout(() => {
      document.querySelector('.PreloaderMain').style = "display: none;";
    }, 1000);
  }

  render() {
    return (
      <>
        <PreloaderMain/>
        <Main widthL={this.state.width} popLoad={this.popLoad.bind(this)}/>
        <Work widthL={this.state.width} hash={this.state.hash} popLoad={this.popLoad.bind(this)}/>
        <About widthL={this.state.width} hash={this.state.hash} popLoad={this.popLoad.bind(this)}/>
      </>
    )
  }
}

export default App