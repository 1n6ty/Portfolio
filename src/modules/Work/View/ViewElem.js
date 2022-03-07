export default function ViewElem(props){
    return (
        <a onClick={() => {props.getWork(props.work)}}>
            <img src={props.img}/>
            <div className='overlay'>
                <div className='text'>
                    <h4>{props.title}</h4>
                    <h5>{props.genre}</h5>
                </div>
            </div>
        </a>
    );
}