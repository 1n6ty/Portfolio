import React, { Component } from 'react';

import Carousel from './Carousel';
import ViewElem from './ViewElem';

export default class View extends Component{

    constructor(props){
        super(props);

        this.state = {
            view: 'none',
            loadingAddFlag: true,
            loadedWorks: [],
            loadedFull: {},
            currentFilt: props.currentFilt
        };

        this.ids = {};
        this.allowFetchFlag = true;
        this.idsCopy = {};
        this.alreadyLoaded = [];
        this.baseUrl = 'http://192.168.0.180:8000/';

        this.getNextWork = this.getNextWork.bind(this);
        this.getPrevWork = this.getPrevWork.bind(this);
        this.setClose = this.setClose.bind(this);
        this.getWork = this.getWork.bind(this);
    }

    componentWillReceiveProps(){
        this.setState((state, props) => ({currentFilt: props.currentFilt}), this.setWorks);
    }

    setWorks(){
        if(this.ids[this.state.currentFilt] !== undefined){
            this.ids[this.state.currentFilt] = this.ids[this.state.currentFilt].map(v => {
                if(this.alreadyLoaded.filter(f => f == v).length != 0){
                    return undefined;
                } 
                return v;
            }).filter(v => v !== undefined);
            this.checkScroll();
        }
    }

    setClose(){
        document.querySelector('.preview').style = 'height: ' + document.querySelector('.preview').clientHeight + 'px;';
        setTimeout(() => {
            document.querySelector('.preview').style = 'transition: height 0.7s; height: 0px;'
        }, 10);
        setTimeout(() => {
            this.setState((state, props) => ({view: 'none'}));
            document.querySelector('.preview').style = '';
        }, 700);
    }

    getWork(id){
        document.querySelector('.preview').classList.remove('up');
        if(this.state.loadedFull[id] === undefined){
            this.setState((state, props) => ({view: 'preloader'}), () => {
                document.querySelector('.preview').classList.add('up');
                setTimeout(() => {
                    document.querySelector('.preview').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 100);
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
                                    document.querySelector('.preview').classList.remove('up');
                                    this.setState((state, props) => {
                                        state.view = id;
                                        state.loadedFull[id] = data;
                                        return state;
                                    }, () => {
                                        document.querySelector('.preview').style = 'opacity: 1;';
                                    });
                                }, 500);
                            });
                        });
                    } else{
                        this.setState((state, props) => ({view: 'preloader'}));
                        console.error('Done!');
                    }
                })
                .catch(rejected => {
                    this.setState((state, props) => ({view: 'preloader'}));
                    console.error('Done!');
                });
            });
        } else{
            if(this.state.view == 'none'){
                this.setState((state, props) => ({view: id}));
                setTimeout(() => {
                    document.querySelector('.preview').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 100);
                document.querySelector('.preview').style = 'transition: opacity 0s; opacity: 0.4;';
                setTimeout(() => {
                    document.querySelector('.preview').style = 'opacity: 1;';
                }, 100);
            } else{
                setTimeout(() => {
                    document.querySelector('.preview').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 100);
                document.querySelector('.preview').style = 'opacity: 0.4;';
                setTimeout(() => {
                    this.setState((state, props) => ({view: id}), () => {
                        document.querySelector('.carousel .inner').style = 'transition: all 0s;';
                    });
                    document.querySelector('.preview').style = 'opacity: 1;';
                    setTimeout(() => {
                        document.querySelector('.carousel .inner').style = '';
                    }, 10);
                }, 500);
            }
        }
    }

    getNextWork(id){
        for(let i = id + 1; i < this.state.loadedWorks.length; i++){
            if(this.state.loadedWorks[i].data.genre == this.state.currentFilt || this.state.currentFilt == 'all'){
                this.getWork(i);
                break;
            }
        }
    }

    getPrevWork(id){
        for(let i = id - 1; i >= 0; i--){
            if(this.state.loadedWorks[i].data.genre == this.state.currentFilt || this.state.currentFilt == 'all'){
                this.getWork(i);
                break;
            }
        }
    }

    checkScroll(){
        if(this.ids[this.state.currentFilt] !== undefined && this.alreadyLoaded.filter((v) => v == this.ids[this.state.currentFilt][0]).length == 0 && this.allowFetchFlag && window.innerHeight + window.scrollY > document.body.scrollHeight - window.innerHeight * 0.8){
            this.getViews();
        }
        if(this.ids[this.state.currentFilt] !== undefined && this.ids[this.state.currentFilt].length != 0){
            requestAnimationFrame(this.checkScroll.bind(this));
        }
    }

    getViews(){
        if(this.ids[this.state.currentFilt].length != 0){
            this.allowFetchFlag = false;
            this.setState((state, props) => ({loadingAddFlag: true}));
            let v = this.ids[this.state.currentFilt].shift();
            this.alreadyLoaded.push(v);

            fetch(this.baseUrl + 'work/short/' + v)
            .then((response) => {
                if(response.ok){
                    response.json()
                    .then((vData) => {
                        const img = new Image();
                        img.src = this.baseUrl + 'work/img/' + v;
                        img.onload = () => {
                            this.setState((state, props) => ({loadedWorks: [...state.loadedWorks, {data: vData, img: img.src, id: v}]}), () => {
                                this.allowFetchFlag = true;
                            });
                            if(this.ids[this.state.currentFilt].length == 0){
                                this.setState((state, props) => ({loadingAddFlag: false}));
                            }
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

    componentDidMount(){
        fetch(this.baseUrl + 'work/category/')
        .then((response) => {
            if(response.ok){
                response.json()
                .then((data) => {
                    this.ids = data.data;
                    this.idsCopy = data.data;
                    this.checkScroll();
                });
            } else{
                this.setState((state, props) => ({loadingAddFlag: false}));
                console.error('Done!');
            }
        })
        .catch(rejected => {
            this.setState((state, props) => ({loadingAddFlag: false}));
            console.error('Done!');
        });
    }

    render(){
        let v = <div className='preview'></div>;
        if(typeof(this.state.view) == 'number'){
            v = (
            <div className='preview'>
                <div>
                    <div className='leftBtn'>
                        <a onClick={() => {this.getPrevWork(this.state.view)}}>previous project</a>
                    </div>
                    <div className='center'>
                        <a className='close' onClick={this.setClose}>close</a>
                        <Carousel img={this.state.loadedFull[this.state.view].img} baseUrl={this.baseUrl}/>
                    </div>
                    <div className='rightBtn'>
                        <a onClick={() => {this.getNextWork(this.state.view)}}>next project</a>
                    </div>
                </div>
                <div className='subscription'>
                    <div>
                        <ul className='short'>
                            <li>
                                <h4>{this.state.loadedFull[this.state.view].short.title}</h4>
                                <small>{this.state.loadedFull[this.state.view].short.genre}</small>
                            </li>
                            <li>
                                <p>Client</p>
                                <p>{this.state.loadedFull[this.state.view].short.client}</p>
                            </li>
                            <li>
                                <p>Role</p>
                                <p>{this.state.loadedFull[this.state.view].short.role}</p>
                            </li>
                        </ul>
                        <div className='description'>
                            <p><a href='#' className='ref'>Link</a> {this.state.loadedFull[this.state.view].description.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
            } else if(this.state.view == 'preloader'){
                v = (<div className='preview'>
                    <div className='workPreloader'>
                        <div className="loadingio-spinner-dual-ball-20eivi2zt7y"><div className="ldio-qm9ez7bosvn">
                        <div></div><div></div><div></div>
                        </div></div>
                    </div>
                </div>);
            }

            let views = [];
            this.state.loadedWorks.forEach((v) => {
                if(v.data.genre == this.state.currentFilt || this.state.currentFilt == 'all'){
                    views.push(<ViewElem title={v.data.title} genre={v.data.genre} img={v.img} key={v.id} work={v.id} getWork={this.getWork}/>);
                }
            });

            return (
            <>{v}
            <div className='works'>
                {views}
                {(this.state.loadingAddFlag) ? (
            <div className='workPreloader'>
                <div className="loadingio-spinner-dual-ball-20eivi2zt7y"><div className="ldio-qm9ez7bosvn">
                <div></div><div></div><div></div>
                </div></div>
            </div>
            ): <></> }
            </div>
            </>
    );
    }
}