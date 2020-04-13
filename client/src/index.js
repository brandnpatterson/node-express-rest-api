import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Users from './pages/Users';

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/messages" component={Messages} />
        <Route path="/profile" component={Profile} />
        <Route path="/users" component={Users} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
