import { useRef, useState } from 'react';
import './KombatCode.scss';

const KombatCode = ({ kombatID }) => {
    const [copiedID, setCopiedID] = useState(false);
    const textInputRef = useRef(null);

    const handleClick = (event) => {
        textInputRef.current.select();
        document.execCommand("copy");
        setCopiedID(true);
    }

    return ( 
        <div className="kombatcode">
            <div className="kombatcode__code">
                <input type="text" className="kombatcode__code__code" ref={textInputRef} value={kombatID} readOnly />
                <button className="kombatcode__code__button" onClick={handleClick}>Copy Kombat ID</button>
            </div>

            <div className="kombatcode__message">
                {copiedID ? <div className="kombatcode__message__copy-message">Copied Kombat ID</div> : null}
            </div>

        </div>
     );
}
 
export default KombatCode;