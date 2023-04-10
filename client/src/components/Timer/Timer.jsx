import './Timer.scss';
import socket from "../../socketConfig";
import { useEffect, useState } from 'react';

const Timer = () => {
    const [timer, setTimer] = useState({timer: "", msg: ""});
    useEffect(() => {
        socket.on('timer', (data) => {
            setTimer(data);
        });
        socket.on('done', () => {
            socket.removeListener('timer');
        });
    }, []);
    // const {countDown, msg} = timer;
    return ( 
        <div className="timer">
            <h2 className="timer__msg">{timer.msg}</h2>
            <h3 className="timer__timer">{timer.timer}</h3>
        </div>
     );
}
 
export default Timer;