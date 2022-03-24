import React, { Component } from 'react';

import '../../static/css/Work/Work.css';

import Specs from '../Specs';
import View from './View/View';

export default class Work extends Component{
    constructor(props){
        super(props);

        this.state = {
            currentFilt: 'all',
            filts: [],
            width: window.innerWidth
        };

        this.baseUrl = 'http://192.168.0.180:8000/';
        this.frameId = '';
    }

    componentWillReceiveProps(){
        this.setState((state, props) => ({width: props.widthL}));
    }

    componentDidMount(){
        fetch(this.baseUrl + 'work/filters/')
        .then((response) => {
            response.json()
            .then((data) => {
                this.setState((state, props) => ({filts: data.filts}));
            });
        })
        .catch((rej) => {
            console.error(rej);
        })
    }

    filtHandler(v){
        this.setState((state, props) => ({currentFilt: state.filts[v]}));
    }

    render(){
        let filts = [];
        this.state.filts.forEach((v, id) => {
            filts.push(<>{(id == 0) ? '': ' /'} <a key={id} onClick={() => {this.filtHandler(id)}}><span className={(v == this.state.currentFilt) ? 'active': ''} data-hover={v}>{v}</span></a></>);
        });

        return (
            <section className='work'>
                <div className='content'>
                    <div className='wp'>
                        <div className='preWord'>
                            <div>
                                <div className='workText'>
                                    <h5>Projects</h5>
                                    <p>Some of our most recent work, feel free to filter the projects based on what stuff we did for each.</p>
                                </div>
                            </div>
                        </div>
                        <div className='filters'>
                            <div className='link'>
                                <p>
                                    {filts}
                                </p>  
                            </div>
                            
                        </div>
                        <View currentFilt={this.state.currentFilt} />
                        <div className='contact'>
                            <div>
                                <h5>Do you want to contact me?</h5>
                                <p>Send me an email over <a className="underline" href="mailto:artyom.inety@gmail.com">artyom.inety@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                    <Specs widthL={this.state.width}/>
                </div>
                <a className='upTrigger' onClick={this.props.closeWorkClick}><span>Close</span></a>
            </section>
        );
    }
}