import './ScoreBoard.scss';

const ScoreBoard = ({ players }) => {
    const getResults = (players) => {
        const scores = players.filter(player => player.wordsPerMinute !== -1);
        return scores.sort((p1, p2) => p1.wordsPerMinute > p2.wordsPerMinute ? -1 : p2.wordsPerMinute > p1.wordsPerMinute ? 1 : 0);
    }

    const results = getResults(players);

    if(results.length === 0) {
        return null
    }

    return ( 
        <div className="scoreboard">
            <h3 className="scoreboard__header">Results</h3>
            {
                results.map((player, index) => {
                    return <div className="scoreboard__results">
                                <p className="scoreboard__results__player-position">{index + 1 + " - " + player.name} &emsp; {player.wordsPerMinute + " WPM"}</p>
                                
                            </div>
                })
            }
        </div>
     );
}
 
export default ScoreBoard;