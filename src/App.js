import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";

import { useStateValue } from "./components/StateProvider";

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {/* BEM naming convention */}
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
               
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
