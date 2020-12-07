import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import VideoPage from './pages/VideoPage'
import NotFound from "./pages/NotFound"
/**
 * @description main entry to my React App.
 */
const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/watch" component={VideoPage}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
};

export default App;
