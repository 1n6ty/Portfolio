import '../../static/css/PreloaderMain/PreloaderMain.css';

export default function PreloaderMain(props){
    return (
        <section className="PreloaderMain">
            <div className="load">
                <div className="cssload-container">
                    <ul className="cssload-flex-container">
                        <li>
                            <span className="cssload-loading cssload-one"></span>
                            <span className="cssload-loading cssload-two"></span>
                            <span className="cssload-loading-center"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}