import "./App.css";
import { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Header from "./components/layout/Header";
import Register from "./components/user/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadUser } from "./actions/userActions";
import store from "./store";
import PostFeed from "./components/admin/PostFeed";
import JobPostings from "./components/admin/JobPostings";
import Approvals from "./components/admin/Approvals";
import GetExpiredJobPostings from "./components/admin/GetExpiredJobPostings";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
       <Route path="/admin/postfeed" component={PostFeed}/>
       <Route path="/admin/jobpostings" component={JobPostings}/>
       <Route path="/admin/approvals" component={Approvals}/>
       <Route path="/admin/expiredJobPostings" component={GetExpiredJobPostings}/>
      <div className="App">
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </div>
    </Router>
  );
}

export default App;
