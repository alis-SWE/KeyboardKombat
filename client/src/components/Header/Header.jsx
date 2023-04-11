import './Header.scss';
import logo from '../../assets/logo/KeyboardKombatLogo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <header className="header">
            <Link className="header__logo-link" to={`/`}>
                <img
                    className="header__logo-link__button" 
                    src={logo}
                    alt="keyboardkombat-logo"
                />
                <h1 className="header__title">KeyboardKombat</h1>
            </Link>
        </header>
     );
}
 
export default Header;
