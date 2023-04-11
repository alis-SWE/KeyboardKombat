import './Practice.scss';
import socket from '../../socketConfig';
import { useNavigate } from 'react-router-dom';
import StartButton from '../../components/StartButton/StartButton';
import Timer from '../../components/Timer/Timer';
import ShowText from '../../components/ShowText/ShowText';
import UserInput from '../../components/UserInput/UserInput';
import ProgressBar from '../../components/ProgressBar/Progressbar';

const findPlayer = (players) => {
    return players.find(player => player.socketID === socket.id);
}

const Practice = ({ kombatState }) => {
    const navigate = useNavigate();
    const {_id, text, isOpen, isOver, players} = kombatState;
    const player = findPlayer(players);
    

    console.log("Kombat State",kombatState);


    if (_id === "") {
        navigate("/");
    }
    return ( 
        <div className="practice">
            <h2 className="practice__header">Practice</h2>
            <Timer />
            <ShowText text={text} player={player} />
            <UserInput isOpen={isOpen} isOver={isOver} kombatID={_id}/>
            <ProgressBar players={players} player={player} textLength={text.length}/>
            <StartButton player={player} kombatID={_id} />
        </div>
     );
}
 
export default Practice;