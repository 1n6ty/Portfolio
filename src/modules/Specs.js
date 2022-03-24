import { Component } from 'react';

export default class Specs extends Component{
    constructor(props){
        super(props);

        this.state = {
            width: props.widthL
        };
    }

    componentWillReceiveProps(){
        this.setState((state, props) => ({width: props.widthL}));
    }
    
    render(){
        return (
            <>
                <div className='link'>
                    <p>
                    <a href='#' target='_blank'><span data-hover="instagram">instagram</span></a> {(this.state.width <= 450) ? <br/>: '/'} <a href='#' target='_blank'><span data-hover="twitter">twitter</span></a>
                    </p>
                </div>
                <div className='myName'>
                    <p>Artyom {(this.state.width <= 450) ? <br/>: ''}Eroshchenko</p>
                </div>
            </>
        );
    }
}