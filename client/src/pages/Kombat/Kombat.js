import { Link } from 'react-router-dom';
import './Kombat.scss';

const Kombat = () => {
    return ( 
        <div className="kombat">
            <Link className="kombat__create" to={'/kombat/create'}>Create Kombat</Link>
            <Link className="kombat__join" to={'/kombat/join'}>Join Kombat</Link>
        </div>
     );
}
 
export default Kombat;