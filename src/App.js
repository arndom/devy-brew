import './App.css';
import * as ROUTES from "./constants/routes"
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Landing from './pages/Landing';
import Final from './pages/Final';
import Subscribe from './pages/Subscribe';
import Paper from './pages/Paper';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  <script type="text/javascript" src="https://CrosswordHobbyist.com/embedjs?puzzle_id=262"></script>

  return (
    <div className="app">
      <Router>
        <ScrollToTop />

        <Switch>
          <Route exact path ={ROUTES.LANDING} component = {Landing} />

          <Route exact path = {ROUTES.SUBSCRIBE.INDEX} component = {Subscribe} />
          <Route exact path = {ROUTES.SUBSCRIBE.FINAL} component = {Final} />

          <Route exact path = {ROUTES.SUBSCRIBE.PAPER} component = {Paper} />


        </Switch>
      </Router>

      {/* landing page*/}
      {/* subscription page */}
      {/* goodbye page */}

    </div>
  );
}

export default App;
