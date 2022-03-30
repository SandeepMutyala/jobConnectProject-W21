import "./App.css";
import { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Header from "./components/layout/Header";
import Register from "./components/user/Register";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { loadUser } from "./actions/userActions";
import store from "./store";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      <div className="App">
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </div>
    </Router>
  );
}

export default App;
