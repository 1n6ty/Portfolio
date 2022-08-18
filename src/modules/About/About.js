import React, { Component } from 'react';
import '../../static/css/About/About.css';
import python from '../../static/img/python.svg';
import JS from '../../static/img/JS.svg';
import cpp from '../../static/img/cpp.svg';
import re from '../../static/img/react.svg';

export default class App extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            width: window.innerWidth
        };
    }

    componentWillReceiveProps(){
        this.setState((state, props) => ({width: props.widthL}), () => {
            this.checkHash();
        });
    }

    checkHash(){
        let e = this.props.hash.match(/aboutMe|work/g);
        if(e !== null){
            e.forEach((v, id) => {
                if(v == 'aboutMe'){
                    this.aboutClick();
                }
                if(v == 'work'){
                    this.closeAboutClick();
                }
            })
        } else{
            this.closeAboutClick();
        }
    }

    closeAboutClick(){
        if(/aboutMe/.test(window.location.hash)) window.location.hash = '';
        document.querySelector('section.main').style = '';
        setTimeout(() => {
            document.querySelector('section.main').className = 'main';
            document.querySelector('section.about').className = 'about';
        }, 10);
    }

    aboutClick(){
        document.querySelector('section.about').style = '';
        setTimeout(() => {
          document.querySelector('section.main').className = 'main down';
          document.querySelector('section.about').className = 'about active';
        }, 10);
      }

      componentDidMount(){
          this.props.popLoad();
          this.checkHash();
      }

    render(){
        return (
            <section className='about'>
                <div className='content'>
                    <div className='wp'>
                        <div className='wrapAbout'>
                            <div>
                                <div className='aboutText'>
                                        <h5>I am Artyom Eroshchenko</h5>
                                        <p>
                                        Over three years in business, We’ve had the chance to work on a variety of projects, with companies and individuals. Custom work is our territory, branding, web design, UI/UX design and front-end development. For work inquires send us an 
                                        </p>
                                </div>
                                <div className='dev'>
                                    <h5>My Development</h5>
                                    <ul>
                                        <li>Fst option</li>
                                        <li>Sec option</li>
                                        <li>Thr option</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='aboutFull'>
                            <div className='wrapFull'>
                                <h5>Programming lang</h5>
                                <p>I mostly program in Python, C++ and JS. Also I know how to make webApps)</p>
                                <div className='langs'>
                                    <div><img src={python}/></div>
                                    <div><img src={cpp}/></div>
                                    <div><img src={JS}/></div>
                                    <div><img src={re}/></div>
                                </div>
                            </div>
                        </div>
                        <div className='contact'>
                            <div>
                                <h5>Do you want to contact me?</h5>
                                <p>Send me an email over <a className="underline" href="mailto:artyom.inety@gmail.com">artyom.inety@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                    <a className='downTrigger' onClick={this.closeAboutClick.bind(this)}><span>Close</span></a>
                    <div className='link'>
                        <p>
                        <a href='#' target='_blank'><span data-hover="instagram">instagram</span></a> {(this.state.width <= 450) ? <br/>: '/'} <a href='#' target='_blank'><span data-hover="twitter">twitter</span></a>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}