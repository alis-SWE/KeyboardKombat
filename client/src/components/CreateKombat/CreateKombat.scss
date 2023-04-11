import { useState } from 'react';
import './JoinKombat.scss';
import { Link } from 'react-router-dom';
import socket from '../../socketConfig';

const JoinKombat = () => {
    const [input, setInput] = useState({kombatID: "", name: ""});

    const handleChange = (event) => {
        setInput({...input, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(input);
        socket.emit("join-kombat", input);
    }

    return (
        <div className="join">
            <h2 className="join__header">Join Kombat</h2>
            <form className="join__form" onSubmit={handleSubmit}>
                <div className="join__form__input">
                    <label htmlFor="name" className="join__form__input__name-label">Name</label>
                    <input type="text" className="join__form__input__name" id="name" name="name" value={input.name} onChange={handleChange} placeholder='Enter your name' required/>
                    <label htmlFor="kombatID" className="join__form__input__join-label">Kombat ID</label>
                    <input type="text" className="join__form__input__join" id="kombatID" name="kombatID" value={input.kombatID} onChange={handleChange} placeholder='Enter Kombat ID' required/>
                </div>
                <div className="join__form__button">
                    <button className="join__form__button__join" type="submit">
                        JOIN KOMBAT
                    </button>
                    <Link className="join__form__button__cancel" to={'/kombat'}>
                        CANCEL
                    </Link>
                </div>
            </form>
        </div> 

    );
}
 
export default JoinKombat;