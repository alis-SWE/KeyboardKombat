import { Link } from 'react-router-dom';
import './Kombat.scss';

const Kombat = () => {
    return ( 
        <div className="kombat">
            <h2 className="kombat__header">Kombat</h2>
            <Link to={'/kombat/create'}>Create Kombat</Link>
            <Link to={'/kombat/join'}>Join Kombat</Link>
        </div>
     );
}
 
export default Kombat;