import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

// import application components
import Footer from './components/Footer/';
import Header from './components/Header/';

import './App.less';

function App() {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route render={() => '404 page not found !'} />
    </Switch>
  );
}
