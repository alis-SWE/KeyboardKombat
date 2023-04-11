import './ShowText.scss';

const getTextTyped = (text, player) => {
    let textTyped = text.slice(0, player.wordIndex);
    textTyped = textTyped.join(" ");
    return <span className="text__typed-correctly">{textTyped} </span>
}

const getCurrentText = (text, player) => {
    return <span className="text__current">{text[player.wordIndex]}</span>
}

const getTextLeft = (text, player) => {
    let textLeft = text.slice(player.wordIndex + 1, text.length);
    textLeft = textLeft.join(" ");
    return <span className="text_left"> {textLeft}</span>
}

const ShowText = ({ text, player }) => {
    
    return ( 
        <div className="text">
            {getTextTyped(text, player)}
            {getCurrentText(text, player)}
            {getTextLeft(text, player)}
        </div>
     );
}
 
export default ShowText;