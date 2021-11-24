import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
