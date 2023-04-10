import { useEffect, useRef, useState } from 'react';
import './UserInput.scss';
import socket from '../../socketConfig';

const UserInput = ({ isOpen, isOver, kombatID }) => {
    const [userInput, setUserInput] = useState("");
    const textInput = useRef(null);

    useEffect(() => {
        if(!isOpen) {
            textInput.current.focus();
        }
    }, [isOpen]);

    const resetInput = () => {
        setUserInput("");
    }

    const handleChange = (event) => {
        let value = event.target.value;
        let lastChar = value.charAt(value.length - 1);
        if(lastChar === " ") {
            socket.emit('userInput', {userInput, kombatID});
            resetInput();
        }
        else {
            setUserInput(event.target.value);
        }
    }

    return ( 
        <div className="user-input">
            <form className="user-input__form">
                <div className="user-input__form__group">
                    <input type="text" className="user-input__form__group__input" readOnly={isOpen || isOver} onChange={handleChange} value={userInput} ref={textInput}/>

                </div>
            </form>
        </div>
     );
}
 
export default UserInput;