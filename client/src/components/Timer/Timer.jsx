import './Timer.scss';
import socket from "../../socketConfig";
import { useEffect, useState } from 'react';

const Timer = () => {
    const [timer, setTimer] = useState({timer: "5", msg: "Starting Kombat: "});
    useEffect(() => {
        socket.on('timer', (data) => {
            setTimer(data);
        });

    }, []);

    return ( 
        <div className="timer">
            <h2 className="timer__msg">{timer.msg}</h2>
            <h2 className="timer__timer">{timer.timer}</h2>
        </div>
     );
}
 
export default Timer;