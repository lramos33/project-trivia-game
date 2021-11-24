import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/feedback" component={ Feedback } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
