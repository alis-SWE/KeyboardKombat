import './StartButton.scss';
import socket from '../../socketConfig';
import { useState } from 'react';

const StartButton = ({ player, kombatID }) => {
    const [buttonVisibility, setButtonVisibility] = useState(true);
    const { host } = player;

    const handleClick = (event) => {
        socket.emit('timer', { playerID: player._id, kombatID });
        setButtonVisibility(false);
    }

    return ( 
        host && buttonVisibility ? <button className="start-button" type="button" onClick={handleClick}>Start Kombat</button> : null
     );
}
 
export default StartButton;