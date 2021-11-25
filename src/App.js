import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import './App.css';
import Gaming from './pages/Gaming';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/gaming" component={ Gaming } />
          <Route path="/settings" component={ Settings } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
