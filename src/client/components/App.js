import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import SocketContext from '../context/SocketContext';
import AnonIdChoicePage from './AnonIdChoicePage';
import SignInPage from './SignInPage';
import MainChat from './MainChat';

//loggedIn = is there access token in browser
//if loggedIn
// render AnonChoiceIdPage component
//if not loggedIn
// redirect to /signin

const socket = io();

export default function App() {
  const loggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('token='));
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Switch>
          {/* csanon.com */}
          <Route exact path='/'>
            {loggedIn ? <AnonIdChoicePage /> : <Redirect to='/signin' />}
          </Route>
          {/* csanon.com/signin */}
          <Route exact path='/signin'>
            <SignInPage />
          </Route>
          {/* csanon.com/chat */}
          <Route path='/chat' render={(props) => <MainChat {...props} />}></Route>
        </Switch>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}
