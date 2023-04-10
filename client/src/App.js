import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import Home from './pages/Home/Home';
import Practice from './pages/Practice/Practice';
import Kombat from './pages/Kombat/Kombat';
import socket from './socketConfig';
import CreateKombat from './components/CreateKombat/CreateKombat';
import JoinKombat from './components/JoinKombat/JoinKombat';
import KeyboardKombat from './pages/KeyboardKombat/KeyboardKombat';

function App() {
  const [kombatState, setKombatState] = useState({_id: "", text: [], isOpen: false, players: []});
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('updateKombat', (kombat) => {
      // const kombatData = kombat;
      console.log(kombat);
      setKombatState(kombat);
    });

    // navigate(`/kombat/${kombatState._id}`);

    return () => {
      socket.removeAllListeners();
    }
  }, []);

  useEffect(() => {
    if(kombatState._id !== "") {
      navigate(`/kombat/${kombatState._id}`)
    }
  }, [kombatState._id]);

  return (
    <div className="App">
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/practice' element={<Practice />}/>
            <Route path='/kombat' element={<Kombat />}/>
            <Route path='/kombat/create' element={<CreateKombat/>}/>
            <Route path='/kombat/join' element={<JoinKombat/>}/>
            <Route path='/kombat/:id' element={<KeyboardKombat kombatState={kombatState}/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
