import '../../static/css/PreloaderMain/PreloaderMain.css';

export default function PreloaderMain(props){
    return (
        <section className="PreloaderMain">
            <div className="load" style={{width: props.widthLoad + 'vw'}}></div>
        </section>
    );
}