import "./App.css";
import { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Header from "./components/layout/Header";
import Register from "./components/user/Register";
import EmployerSideNav from "./components/jobPosting/employerSideNav";
import employerDashboardHome from "./components/jobPosting/employerDashboardHome"
import EmployerDashboard from "./components/jobPosting/employerDashboard";
import JobPostForm from "./components/jobPosting/jobPostForm";
import EditJobPost from "./components/jobPosting/editJobPost";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadUser } from "./actions/userActions";
import store from "./store";

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
          <Route path="/EmployerSideNav" component={EmployerSideNav} />
          <Route path="/employerDashboardHome" component={employerDashboardHome} />
          <Route path="/employerDashboard" component={EmployerDashboard} />
          <Route path="/JobPostForm" component={JobPostForm} />
          <Route path="/EditJobPost" component={EditJobPost} />       
        </div>
      </div>
    </Router>
  );
}

export default App;
