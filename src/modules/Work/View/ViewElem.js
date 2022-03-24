export default function ViewElem(props){
    return (
        <a onClick={() => {props.getWork(props.work)}}>
            <img src={props.img}/>
            <div className='overlay'>
                <div className='text'>
                    <p>
                    {props.title}
                    <br/>
                        <span>{props.genre}</span>
                    </p>
                </div>
            </div>
        </a>
    );
}