import "./App.css";
import { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Header from "./components/layout/Header";
import Register from "./components/user/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadUser } from "./actions/userActions";
import PostFeed from "./components/postFeed/PostFeed";
import MyPosts from "./components/postFeed/MyPosts";
import store from "./store";


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header/>
      <div className="App">
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/homepage" component={PostFeed}/>
          <Route path="/myposts" component={MyPosts}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
