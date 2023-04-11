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
            <div className="progressbar__player">
                <p className="progressbar__player__player-name">{player.name}</p>
                <div className="progressbar__player__bar" key={player._id}>
                    <div className="progressbar__player__bar__progress" style={{width: percentage + '%'}}>{percentage + '%'}</div>
                </div>
                <p className="progressbar__player__wpm">{player.wordsPerMinute + " WPM"}</p>
            </div>
            

            {
                players.map(playerObj => {
                    const percentage = calcPercentage(playerObj, textLength);
                    return playerObj._id !== player._id ? 
                    <div className="progressbar__player">
                        <p className="progressbar__player__player-name">{playerObj.name}</p>
                        <div className="progressbar__player__bar" key={playerObj._id}>
                            <div className="progressbar__player__bar__progress" style={{width: percentage + '%'}}>{percentage + '%'}</div>
                        </div>
                        <p className="progressbar__player__wpm">{playerObj.wordsPerMinute + " WPM"}</p>
                    </div> : null
                })
            }
        </div>
     );
}
 
export default ProgressBar;