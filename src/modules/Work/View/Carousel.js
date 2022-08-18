import React, { Component } from 'react';

import left from '../../../static/img/left.svg';
import right from '../../../static/img/right.svg';

import '../../../static/css/Work/Carousel.css';

export default class Carousel extends Component{
    constructor(props){
        super(props);

        this.slideRight = this.slideRight.bind(this);
        this.slideLeft = this.slideLeft.bind(this);
        this.dotClick = this.dotClick.bind(this);

        this.xDown = null;
        this.workId = props.workId;
        
        this.state = {
            curSlide: 0,
            maxSlides: props.img.length,
            img: props.img,
            xDiff: 0,
        };
    }

    componentWillReceiveProps(){
        let prevFlag = false;
        this.setState((state, props) => {
            if(this.workId != '' && props.workId != '' && this.workId != props.workId){
                prevFlag = true;
                state.maxSlides = props.img.length;
                state.img = props.img;
                state.curSlide = 0;
                this.workId = this.props.workId;
            }
            return state;
        }, () => {
            if(prevFlag) this.changeDots(0);
        });
    }

    slideRight(){
        this.setState((state, props) => (
            {curSlide: (state.curSlide + 1 < state.maxSlides) ? state.curSlide + 1: 0}
        ), () => {this.changeDots(this.state.curSlide)});
    }

    slideLeft(){
        this.setState((state, props) => (
            {curSlide: (state.curSlide - 1 >= 0) ? state.curSlide - 1: state.maxSlides - 1}
        ), () => {this.changeDots(this.state.curSlide)});
    }

    changeDots(value){
        let list = document.querySelectorAll('.control .dots li');
        for(let i = 0; i < this.state.maxSlides; i++){
            if(list[i].classList.contains('active')) list[i].classList.remove('active');
            if(i == value && !list[i].classList.contains('active')){
                list[i].classList.add('active');
            }
        }
    }

    dotClick(value){
        this.setState((state, props) => (
            {curSlide: value}
        ));
        this.changeDots(value);
    }

    handleTouchStart(e){
        this.xDown = e.touches[0].clientX;
        document.getElementsByClassName('inner')[0].style = `transition: none; transform: translateX(-${this.state.curSlide * 100 + this.state.xDiff}%)`;
    }

    handleTouchMove(e){
        this.setState((state, props) => ({xDiff: 100 * (this.xDown - e.touches[0].clientX) / e.target.clientWidth}));
    }

    handleTouchEnd(e){
        if(this.state.xDiff >= 20){
            this.slideRight();
        }
        if(this.state.xDiff <= -20){
            this.slideLeft();
        }
        this.setState((state, props) => ({xDiff: 0}));
        document.getElementsByClassName('inner')[0].style = `transform: translateX(-${this.state.curSlide * 100 + this.state.xDiff}`;
    }

    render(){
        let dots = [];
        for(let i = 0; i < this.state.maxSlides - 1; i++){
            dots.push(<li key={i + 1} onClick={() => this.dotClick(i + 1)}></li>);
        }

        let v = [], count = 0;
        for(let i of this.state.img){
            v.push(<img src={this.props.baseUrl + i} key={count}/>);
            count ++;
        }

        return (
            <div className='carousel' onTouchMove={(e) => this.handleTouchMove(e)} onTouchStart={(e) => this.handleTouchStart(e)} onTouchEnd={(e) => this.handleTouchEnd(e)}>
                <div className='control'>
                    <a onClick={this.slideLeft} className="prevBtn"><img src={left}/></a>
                    <a onClick={this.slideRight} className="nextBtn"><img src={right}/></a>
                    <ul className='dots'>
                        <li className='active' key={0} onClick={() => this.dotClick(0)}></li>
                        {dots}
                    </ul>
                </div>
                <div className='inner' style={{transform: 'translateX(-' + (this.state.curSlide * 100 + this.state.xDiff) + '%)'}}>
                    {v}
                </div>
            </div>
        );
    }
}