import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import {TOKEN_KEY, NAME_KEY} from '../constants';
import {useHistory} from 'react-router-dom';

function App () {

  const [isLoggedIn, setLogin] = useState(localStorage.getItem(TOKEN_KEY) ? true : false)
  const [firstname, setFirstname] = useState(localStorage.getItem(NAME_KEY))

  let history = useHistory();

  const handleLoggedIn = (data) => {
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(NAME_KEY, data.firstname)
    setLogin(true)
    setFirstname(data.firstname)
    history.push('/')
  }

  const handleSignout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(NAME_KEY)
    setLogin(false)
    setFirstname('')
    history.push('/')
  }

    return (
      <div className="app">
        <Header isLoggedIn={isLoggedIn}
                firstname={firstname} 
                onSignout={handleSignout}/>
        <Main onLoggedIn={handleLoggedIn}
              onRegistered={handleLoggedIn}/>
      </div>
    );

}

export default App;
