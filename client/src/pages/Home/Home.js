import './Home.scss';
import { Link } from "react-router-dom";


const Home = () => {
    return ( 
        <div className="home">
            <h2 className="home__header">KeyboardKombat</h2>
            <Link to={'/practice'}>Practice</Link>
            <Link to={'/kombat'}>Kombat</Link>
        </div>
     );
}
 
export default Home;