import './Home.scss';
import { Link } from "react-router-dom";


const Home = () => {
    return ( 
        <div className="home">
            <Link className="home__practice" to={'/practice'}>Practice</Link>
            <Link className="home__kombat" to={'/kombat'}>Kombat</Link>
        </div>
     );
}
 
export default Home;