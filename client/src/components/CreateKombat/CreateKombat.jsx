import { useState } from 'react';
import './CreateKombat.scss';
import { Link } from 'react-router-dom';
import socket from '../../socketConfig';

const CreateKombat = () => {
    const [name, setName] = useState("");

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit("create-kombat", name);
    }

    return (
        <div className="create">
            <h2 className="create__header">Create Kombat</h2>
            <form className="create__form" onSubmit={handleSubmit}>
                <div className="create__form__input">
                    <label htmlFor="name" className="create__form__input__name-label">Name</label>
                    <input type="text" className="create__form__input__name" id="name" name="name" value={name} onChange={handleChange} placeholder='Enter your name' required/>
                </div>
                <div className="create__form__button">
                    <button className="create__form__button__create" type="submit">
                        CREATE KOMBAT
                    </button>
                    <Link className="create__form__button__cancel" to={'/kombat'}>
                        CANCEL
                    </Link>
                </div>
            </form>
        </div> 

    );
}
 
export default CreateKombat;