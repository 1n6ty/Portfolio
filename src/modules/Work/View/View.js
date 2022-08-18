import React, { Component } from 'react';

import Carousel from './Carousel';
import ViewElem from './ViewElem';

import '../../../static/css/Work/View.css';
import '../../../static/css/common/preloader.css';

class View extends Component{

    constructor(props){
        super(props);

        this.state = {
            view: 'none',
            loadedViews: [],
            loadedWorks: {},
            currentFilt: props.currentFilt
        };

        this.idsToLoad = {};
        this.baseUrl = 'http://192.168.0.180:8000/';
        this.prevHash = window.location.hash;

        this.preloader = (
            <div className="cssload-container">
                <ul className="cssload-flex-container">
                    <li>
                        <span className="cssload-loading cssload-one"></span>
                        <span className="cssload-loading cssload-two"></span>
                        <span className="cssload-loading-center"></span>
                    </li>
                </ul>
            </div>
        );

        this.setClose = this.setClose.bind(this);
        this.getWork = this.getWork.bind(this);
    }

    componentWillReceiveProps(){
        let prevFilt = this.state.currentFilt;
        this.setState((state, props) => {
            state.currentFilt = props.currentFilt;
            return state;
        }, () => {
            if(prevFilt != this.state.currentFilt){
                this.getViews();
            }
        });
    }

    componentDidUpdate(){
        if(this.prevHash != this.props.hash){
            this.checkHash();
            this.prevHash = this.props.hash;
        }
        this.getViews();
        if(!(/work/.test(window.location.hash)) && this.state.view != 'none'){
            document.querySelector('.preview').style = 'height: ' + document.querySelector('.preview').clientHeight + 'px; opacity: 1;';
            setTimeout(() => {
                document.querySelector('.preview').style = 'height: 0; opacity: 0; overflow: hidden;';
                setTimeout(() => {
                    document.querySelector('.preview').style = 'overflow: hidden; opacity: 0.4;';
                    this.setState((state, props) => ({view: 'none'}));
                }, 800);
            }, 10)
        }
    }

    setClose(){
        window.location.hash = '#work'
        document.querySelector('.preview').style = 'height: ' + document.querySelector('.preview').clientHeight + 'px; opacity: 1;';
        setTimeout(() => {
            document.querySelector('.preview').style = 'height: 0; opacity: 0; overflow: hidden;';
            setTimeout(() => {
                document.querySelector('.preview').style = 'overflow: hidden; opacity: 0.4;';
                this.setState((state, props) => ({view: 'none'}));
                this.getViews();
            }, 800);
        }, 10)
    }

    getPrevWork(id){
        let t = [];
        let arr = this.state.loadedViews.filter(e => e.data.genre == this.state.currentFilt || this.state.currentFilt == 'all').map(e => e.id);
        for(let i = 0; i <= arr.length; i++){
            if(arr[i] == id){
                t.push(arr[i - 1]);
                break;
            }
        }
        for(let i = 0; i <= this.idsToLoad[this.state.currentFilt].length; i++){
            if(this.idsToLoad[this.state.currentFilt][i] == id){
                t.push(this.idsToLoad[this.state.currentFilt][i - 1]);
                break;
            }
        }
        t = t.filter(e => e !== undefined);
        if(t.length > 0) this.getWork(Math.min(...t));
    }

    getNextWork(id){
        let arr = this.state.loadedViews.filter(e => e.data.genre == this.state.currentFilt || this.state.currentFilt == 'all').map(e => e.id);
        let t = [arr.find(e => e < id), this.idsToLoad[this.state.currentFilt].find(e => e < id)].filter(e => e !== undefined);
        if(t.length > 0){
            this.getWork(Math.max(...t));
        }
    }

    getWork(id){
        if(window.location.hash != ("#work_" + id)) window.location.hash = "#work_" + id;
        document.querySelector('.preview').style = 'transition: opacity 0s; opacity: 0.4;';
        this.setState((state, props) => ({
            view: 'load'
        }), () => {
            setTimeout(() => {
                document.querySelector('.preview').style = 'opacity: 1';
                document.querySelector('section.work .preview').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 50);
        });
        if(this.state.loadedWorks[id] === undefined){
            fetch(this.baseUrl + 'work/data/' + id)
            .then((response) => {
                if(response.ok){
                    response.json()
                    .then((data) => {
                        Promise.all(data.img.map((v) => {
                            let img = new Image();
                            return new Promise(r => img.onload=r, img.src=v);
                        })).then(() => {
                            document.querySelector('.preview').style = 'opacity: 0.4;';
                            setTimeout(() => {
                                this.setState((state, props) => {
                                    state.loadedWorks[id] = data;
                                    state.view = id;
                                    return state;
                                }, () => {
                                    setTimeout(() => {
                                        document.querySelector('.preview').style = 'opacity: 1';
                                    }, 50);
                                });
                            }, 500);
                        });
                    });
                } else{
                    console.error('Server error');
                }
            })
            .catch(rejected => {
                console.error('Fetch error');
            });
        } else{
            this.setState((state, props) => ({
                view: id
            }), () => {
                setTimeout(() => {
                    document.querySelector('.preview').style = 'opacity: 1';
                }, 50);
            });
        }
    }

    getViews(){
        let viewsRect = document.querySelector('section.work .works'),
            worksWindow = document.querySelector('section.work');
        if(this.idsToLoad[this.state.currentFilt] && this.idsToLoad[this.state.currentFilt].length != 0 && viewsRect.clientHeight < worksWindow.scrollTop + window.innerHeight){
            let v = this.idsToLoad[this.state.currentFilt].shift();
            for(const [key, value] of Object.entries(this.idsToLoad)){
                this.idsToLoad[key] = value.filter(e => e != v);
            }
            this.setState((state, props) => {
                let loadedvt = [...state.loadedViews, {
                    data: (
                        <a className='viewsPreloader'>
                            {this.preloader}
                        </a>
                    ),
                    loaded: false,
                    id: v
                }];
                loadedvt.sort((a, b) => b.id - a.id);
                return {loadedViews: loadedvt};
            });
            fetch(this.baseUrl + 'work/short/' + v)
            .then((response) => {
                if(response.ok){
                    response.json()
                    .then((vData) => {
                        const img = new Image();
                        img.src = this.baseUrl + 'work/img/' + v;
                        img.onload = () => {
                            this.setState((state, props) => {
                                state.loadedViews = state.loadedViews.map((e) => {
                                    if(e.id == v){
                                        return {data: vData, img: img.src, id: v, loaded: true};
                                    }
                                    return e;
                                });
                                return state;
                            });
                        }
                    });
                } else{
                    console.error('Server error');
                }
            })
            .catch(rejected => {
                console.error('Fetch error');
            });
        }
    }

    checkHash(){
        let e = this.props.hash.match(/[0-9]*/g);
        if(e !== null){
            e.forEach((v) => {
                if(v != ''){
                    this.getWork(parseInt(v));
                }
            })
        }
    }

    componentDidMount(){
        fetch(this.baseUrl + 'work/category/')
        .then((response) => {
            if(response.ok){
                response.json()
                .then((data) => {
                    this.idsToLoad = data.data;
                    document.querySelector('section.work').addEventListener('scroll', () => {
                        this.getViews();
                    });
                    this.props.popLoad();
                    this.checkHash();
                });
            } else{
                console.error('Server error');
            }
        })
        .catch(rejected => {
            console.error('Fetch error');
        });
    }

    copyToClipboard(text){
        document.querySelector('.link .share').className = 'share active'
        let textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    }

    render(){
        let viewBody = (<div className='preview' style={{overflow: 'hidden', opacity: 0.4}}></div>);
        if(this.state.view == 'load'){
            viewBody = (
                <div className='preview' style={{overflow: 'hidden', opacity: 0.4}}>
                    <div className='workPreloader'>
                        {this.preloader}
                    </div>
                </div>
            );
        }
        if(typeof(this.state.view) == 'number'){
            viewBody = (
                <div className='preview' style={{overflow: 'hidden', opacity: 0.4}}>
                    <div className='center'>
                        <a className='close' onClick={this.setClose}>close</a>
                        <div className='leftBtn'>
                            <a onClick={() => {this.getPrevWork(this.state.view)}}>previous project</a>
                        </div>
                        <Carousel img={this.state.loadedWorks[this.state.view].img} baseUrl={this.baseUrl} key={0} workId={window.location.hash.substring(1)} />
                        <div className='rightBtn'>
                            <a onClick={() => {this.getNextWork(this.state.view)}}>next project</a>
                        </div>
                    </div>
                    <div className='subscription'>
                        <div>
                            <ul className='short'>
                                <li>
                                    <h4>{this.state.loadedWorks[this.state.view].short.title}</h4>
                                    <small>{this.state.loadedWorks[this.state.view].short.genre}</small>
                                </li>
                                <li>
                                    <p>Client</p>
                                    <p>{this.state.loadedWorks[this.state.view].short.client}</p>
                                </li>
                                <li>
                                    <p>Role</p>
                                    <p>{this.state.loadedWorks[this.state.view].short.role}</p>
                                </li>
                            </ul>
                            <div className='description'>
                                <p>{this.state.loadedWorks[this.state.view].description.text}</p>
                                <a href='#' className='ref PrjLink'>Link to GitHub</a>
                                <div className='link'>
                                    <p>
                                        <a className='share' onClick={() => this.copyToClipboard(window.location.href)}>
                                            <span data-hover="Copied!" >Click to copy sharelink</span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <>
                {viewBody}
                <div className='works'>
                    {this.state.loadedViews.map((v) => {
                        if(v.loaded){
                            if(v.data.genre == this.state.currentFilt || this.state.currentFilt == 'all'){
                                return <ViewElem title={v.data.title} genre={v.data.genre} img={v.img} key={v.id} work={v.id} getWork={this.getWork}/>
                            }
                        } else{
                            return <React.Fragment key={v.id}>{v.data}</React.Fragment>;
                        }
                    }).filter(e => e !== undefined)}
                </div>
            </>
        );
    }
}

export default View;