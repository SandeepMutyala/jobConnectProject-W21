import "./App.css";
import React, { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Header from "./components/layout/Header";
import Register from "./components/user/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Profile from "./components/profile/profile.component";
import AddEducation from "./components/profile/addEducation.component";
import UpdateEducation from "./components/profile/updateEducation.component";
import AddExperience from "./components/profile/addExperience.component";
import Updateexperience from "./components/profile/updateExperience.component";
import EditSummary from "./components/profile/editSummary.component";
import User from "./components/profile/fetchuser.component";
import SearchUser from "./components/profile/searchuser";
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
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/addEducation" exact component={AddEducation} />
          <Route
            path="/updateEducation/:id"
            exact
            component={UpdateEducation}
          />
          <Route
            path="/fetchuser/:id"
            exact
            component={User}
          />
          <Route
            path="/searchuser"
            exact
            component={SearchUser}
          />
          <Route path="/addExperience" exact component={AddExperience} />
          <Route
            path="/updateExperience/:id"
            exact
            component={Updateexperience}
          />
          <Route path="/editSummary" exact component={EditSummary} />
        </div>
      </div>
    </Router>
  );
}

export default App;
