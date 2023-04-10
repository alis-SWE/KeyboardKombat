import './ProgressBar.scss';

const calcPercentage = (player, textLength) => {
    if(player.wordIndex !== 0) {
        return Math.floor((player.wordIndex / textLength) * 100)
    }
    return 0;
}

const ProgressBar = ({ players, player, textLength }) => {
    const percentage = calcPercentage(player, textLength);

    return ( 
        <div className="progressbar">
            <h5 className="progressbar__player">{player.name}</h5>
            <div className="progressbar__bar" key={player._id}>
                <div className="progressbar__bar__progress" style={{width: percentage + '%'}}>{percentage + '%'}</div>
            </div>
            {
                players.map(playerObj => {
                    const percentage = calcPercentage(playerObj, textLength);
                    return playerObj._id !== player._id ? 
                    <>
                        <h5 className="progressbar__player">{playerObj.name}</h5>
                        <div className="progressbar__bar" key={playerObj._id}>
                            <div className="progressbar__bar__progress" style={{width: percentage + '%'}}>{percentage + '%'}</div>
                        </div>
                    </> : null
                })
            }
        </div>
     );
}
 
export default ProgressBar;